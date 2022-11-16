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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHTTPMares = void 0;
const server_1 = require("../../config/server");
/** 加载中间件 */
async function initHTTPMares() {
    const { middleware, logger } = server_1.serverConfig;
    const maresBefore = [];
    const maresAfter = [];
    for (const initerMare_ of middleware?.before ?? []) {
        try {
            let initerMare = initerMare_;
            if (typeof initerMare_ == 'string') {
                initerMare = (await Promise.resolve().then(() => __importStar(require(`./lib/mare/${initerMare_}.ts`)))).default;
            }
            maresBefore.push(await initerMare());
        }
        catch (error) {
            logger.warn('加载~[HTTP接口前置中间件]', error);
        }
    }
    for (const initerMare_ of middleware?.after ?? []) {
        try {
            let initerMare = initerMare_;
            if (typeof initerMare_ == 'string') {
                initerMare = (await Promise.resolve().then(() => __importStar(require(`./lib/mare/${initerMare_}.js`)))).default;
            }
            maresAfter.push(await initerMare());
        }
        catch (error) {
            logger.warn('加载~[HTTP接口后置中间件]', error);
        }
    }
    return [maresBefore, maresAfter];
}
exports.initHTTPMares = initHTTPMares;
