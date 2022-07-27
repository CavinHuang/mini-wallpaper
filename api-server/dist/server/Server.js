"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_helmet_1 = __importDefault(require("koa-helmet")); // 网络安全
const http_1 = require("http");
const http2_1 = require("http2");
const path_1 = __importDefault(require("path"));
const initRouter_1 = __importDefault(require("./core/initRouter"));
const config_1 = require("../config");
const models_1 = require("../models");
class Server {
    config;
    http2;
    server;
    koa;
    logTrace;
    logDebug;
    logInfo;
    logWarn;
    logError;
    logMark;
    logFatal;
    constructor(serverConfig) {
        if (!serverConfig)
            throw TypeError('缺少 [服务器配置]{serverConfig}');
        this.config = serverConfig;
        this.koa = new koa_1.default();
        this.server = this.http2 ? (0, http2_1.createSecureServer)(this.http2) : (0, http_1.createServer)(this.koa.callback());
        this.init()
            .then(() => {
            this.start();
        })
            .catch((e) => {
            this.logError('运行错误', e);
        });
    }
    async init() {
        try {
            this.initLogger();
            await (0, models_1.typeOrmInit)(this.logInfo);
            this.initApp();
            await this.initRouter();
        }
        catch (e) {
            this.logError('运行错误', e);
        }
    }
    /** 服务器协议头 */
    get protocol() {
        return this.http2 ? 'http2' : 'http';
    }
    /** 用于日志记录的服务器名称 */
    get nameLog() {
        return typeof this.config.name == 'string' ? this.config.name : 'Server';
    }
    /** 启动服务器 */
    async start() {
        const { config: { server: { host, port } }, server, logInfo, logFatal } = this;
        try {
            // 监听端口
            server.listen(port, host, () => {
                logInfo(`监听~{${this.protocol}://${host == '0.0.0.0' ? 'localhost' : host}:${port}}`, '✔ ');
            });
        }
        catch (error) {
            logFatal(`监听~{${this.protocol}://${host}:${port}}`, error);
        }
    }
    /**
     * koa 中间键
     */
    initApp() {
        const koa = this.koa;
        koa.use(function (ctx, next) {
            return next().catch((err) => {
                console.log(err);
                if (401 == err.status) {
                    ctx.status = 401;
                    ctx.body = { code: 401, message: '您还没有登录，请先登录！' };
                }
                else if (404 === err.status) {
                    ctx.status = 404;
                    ctx.body = { code: 404, message: '您访问的路径不存在' };
                }
                else {
                    throw err;
                }
            });
        });
        koa.use(async (ctx, next) => {
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
            ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
            if (ctx.method === 'OPTIONS') {
                ctx.body = 200;
            }
            else {
                await next();
            }
        });
        koa.use((0, koa_body_1.default)());
        koa.use((0, koa_static_1.default)(path_1.default.resolve(__dirname, '../../static')));
        // koa.use(httpProxy())
        koa.use((0, koa_jwt_1.default)({
            secret: config_1.secret
        }).unless({
            path: config_1.unlessRoute
        }));
        koa.use((0, cors_1.default)());
        // hsts请求头
        // koa.use(
        //   Helmet.contentSecurityPolicy({
        //     // directives: {
        //     //   defaultSrc: ['self', 'unsafe-inline', 'unsafe-eval'],
        //     //   objectSrc: ['none'],
        //     //   scriptSrc: ['self', 'unsafe-inline', 'unsafe-eval'],
        //     //   styleSrc: ['self', 'https:', 'unsafe-inline'],
        //     //   imgSrc: ['self', 'https:', 'data:', 'blob:', 'mediastream:', 'filesystem:'],
        //     //   fontSrc: ['self', 'https:', 'data:', 'blob:', 'mediastream:', 'filesystem:']
        //     // }
        //   })
        // )
        koa.use(koa_helmet_1.default.expectCt());
        koa.use(koa_helmet_1.default.frameguard());
        koa.use(koa_helmet_1.default.hidePoweredBy());
        koa.use(koa_helmet_1.default.hsts());
        koa.use(koa_helmet_1.default.ieNoOpen());
        koa.use(koa_helmet_1.default.noSniff());
        koa.use(koa_helmet_1.default.permittedCrossDomainPolicies());
        koa.use(koa_helmet_1.default.referrerPolicy());
        koa.use(koa_helmet_1.default.xssFilter());
    }
    async initRouter() {
        await (0, initRouter_1.default)(this, config_1.dirController);
    }
    /** 加载日志函数 */
    initLogger() {
        const { config: { logger } } = this;
        // 关闭日志
        if (logger === false) {
            this.logTrace = () => { };
            this.logDebug = () => { };
            this.logInfo = () => { };
            this.logError = () => { };
            this.logWarn = () => { };
            this.logFatal = () => { };
            this.logMark = () => { };
        }
        // 单一日志
        else if (typeof logger == 'function') {
            this.logTrace = (...params) => logger(this.nameLog, ...params);
            this.logDebug = (...params) => logger(this.nameLog, ...params);
            this.logInfo = (...params) => logger(this.nameLog, ...params);
            this.logError = (...params) => logger(this.nameLog, ...params);
            this.logWarn = (...params) => logger(this.nameLog, ...params);
            this.logFatal = (...params) => logger(this.nameLog, ...params);
            this.logMark = (...params) => logger(this.nameLog, ...params);
        }
        // 分级日志
        else {
            const csl = console;
            this.logTrace =
                typeof logger?.trace == 'function'
                    ? (...params) => logger.trace(this.nameLog, ...params)
                    : typeof csl.trace == 'function'
                        ? (...params) => csl.trace(this.nameLog, ...params)
                        : (...params) => csl.log(this.nameLog, ...params);
            this.logDebug =
                typeof logger?.debug == 'function'
                    ? (...params) => logger.debug(this.nameLog, ...params)
                    : typeof csl.debug == 'function'
                        ? (...params) => csl.debug(this.nameLog, ...params)
                        : (...params) => csl.log(this.nameLog, ...params);
            this.logInfo =
                typeof logger?.info == 'function'
                    ? (...params) => logger.info(this.nameLog, ...params)
                    : typeof csl.info == 'function'
                        ? (...params) => csl.info(this.nameLog, ...params)
                        : (...params) => csl.log(this.nameLog, ...params);
            this.logError =
                typeof logger?.error == 'function'
                    ? (...params) => logger.error(this.nameLog, ...params)
                    : typeof csl.error == 'function'
                        ? (...params) => csl.error(this.nameLog, ...params)
                        : (...params) => csl.log(this.nameLog, ...params);
            this.logWarn =
                typeof logger?.warn == 'function'
                    ? (...params) => logger.warn(this.nameLog, ...params)
                    : typeof csl.warn == 'function'
                        ? (...params) => csl.warn(this.nameLog, ...params)
                        : (...params) => csl.log(this.nameLog, ...params);
            this.logFatal =
                typeof logger?.fatal == 'function'
                    ? (...params) => logger.fatal(this.nameLog, ...params)
                    : typeof csl.error == 'function'
                        ? (...params) => csl.error(this.nameLog, ...params)
                        : (...params) => csl.log(this.nameLog, ...params);
            this.logMark =
                typeof logger?.mark == 'function'
                    ? (...params) => logger.mark(this.nameLog, ...params)
                    : typeof csl.info == 'function'
                        ? (...params) => csl.info(this.nameLog, ...params)
                        : (...params) => csl.log(this.nameLog, ...params);
        }
    }
}
exports.Server = Server;
