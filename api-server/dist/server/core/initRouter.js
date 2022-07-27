"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("../../config/path");
const koa_router_1 = __importDefault(require("koa-router"));
const path_2 = require("path");
const fs_readdir_recursive_1 = __importDefault(require("fs-readdir-recursive"));
const initMiddleware_1 = require("./initMiddleware");
const appendExt = path_1.isDev ? '.api.ts' : '.api.js';
const initRouterHandler = async (server, pathAPP) => {
    const router = new koa_router_1.default();
    const methodsRouter = router.methods.map((m) => m.toLowerCase());
    const [maresHTTPBefore, maresHTTPAfter] = await (0, initMiddleware_1.initHTTPMares)(server);
    const initRoute = async (pathAPP) => {
        const filesAPP = (0, fs_readdir_recursive_1.default)(pathAPP);
        const face = [];
        filesAPP
            .filter((file) => file.endsWith(appendExt))
            .forEach((fileAPI) => {
            const infoAPI = (0, path_2.parse)(fileAPI);
            const pathAPI = (0, path_2.join)(pathAPP, fileAPI);
            const route = path_2.posix.join(...infoAPI.dir.split(path_2.sep), (0, path_2.basename)(infoAPI.base, appendExt));
            face.push({
                route,
                pathAPI
            });
        });
        for (let i = 0; i < face.length; i++) {
            await controllerMounter(face[i].route, face[i].pathAPI);
        }
    };
    // 挂载HTTP接口
    const controllerMounter = async (route, controllerPath) => {
        const controller = (await Promise.resolve().then(() => __importStar(require(controllerPath)))).default;
        const controllerInstance = new controller();
        const methodsHTTP = controllerInstance.method
            ? controllerInstance.method
                .split('.')
                .map((m) => m.toLowerCase())
                .filter((m) => methodsRouter.includes(m))
            : ['get'];
        for (const method of methodsHTTP) {
            bindControllerWithRouter(method, controllerInstance, route, router);
        }
    };
    const facePrefix = '/api';
    const bindControllerWithRouter = (method, controllerInstance, route, router) => {
        const routeFinal = path_2.posix.join(facePrefix ?? '/', route);
        router[method](routeFinal, async function (ctx, next) {
            ctx.rout = {
                route,
                method,
                option: { parseResult: true, ...(controllerInstance.apiOptions || {}) }
            };
            await next();
        });
        // 前置中间件
        for (const mare of maresHTTPBefore) {
            router[method](routeFinal, mare);
        }
        // 主处理函数
        router[method](routeFinal, async function (ctx_, next) {
            const ctx = ctx_;
            server.logDebug(method + '请求:' + ctx.path + '; 参数：' + JSON.stringify(ctx.raw));
            try {
                const result = await controllerInstance.handle(ctx.raw, ctx, routeFinal, server);
                if (result !== undefined) {
                    server.logDebug(method + '请求:' + ctx.path + '; 返回数据：' + JSON.stringify(result));
                    ctx.body = result;
                }
            }
            catch (error) {
                ctx.body = error instanceof Error ? error : Error(error);
                server.logError(`执行 ~[HTTP接口]~{${route}}`, ctx.body);
            }
            await next();
        });
        // 后置中间件
        for (const mare of maresHTTPAfter) {
            router[method](routeFinal, mare);
        }
        server.logDebug(`✔ 加载 ~[HTTP接口]~{${method}}~{${route}}`);
    };
    initRoute(pathAPP).then(() => {
        server.koa.use(router.routes());
    });
};
exports.default = initRouterHandler;
