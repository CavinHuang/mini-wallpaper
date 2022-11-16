"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@/service/common");
const responce_1 = require("../responce");
const index_1 = require("./../redis/index");
const businessError_1 = require("../error/businessError");
const initMareParseResult = () => {
    return async (ctx, next) => {
        const rout = ctx.rout;
        ctx.type = 'json';
        if (rout.option.parseResult) {
            try {
                let body = ctx.body;
                if (body instanceof businessError_1.BusinessError) {
                    ctx.body = responce_1.Response.error(body.message, process.env.NODE_ENV === 'development' ? body.stack : null, body.code);
                }
                else {
                    //塞入config
                    const headerAppid = ctx.headers.appid;
                    const queryAppid = ctx.request.query.appid;
                    const appid = (headerAppid || queryAppid) || '';
                    body.config = await (0, index_1.redisGet)(`${common_1.CONFIG_REDIS_KEY}${appid}`);
                    ctx.body = body;
                }
            }
            catch (e) {
                ctx.status = 500;
                ctx.body = e.message;
            }
        }
        await next();
    };
};
exports.default = initMareParseResult;
