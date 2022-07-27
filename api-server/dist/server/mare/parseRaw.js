"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    return async function parseRaw(ctx_, next) {
        const ctx = ctx_;
        if ('raw' in ctx) {
            return await next();
        }
        let body = {};
        if (ctx.method.toLowerCase() === 'get') {
            body = ctx.request.query;
        }
        else {
            body = ctx.request.body;
        }
        ctx.request.body = ctx.request.body;
        ctx.request.bodyRaw = ctx.request.body;
        const raw = {};
        const keysFrom = (raw._keysFrom = {});
        if (typeof ctx.query == 'object') {
            for (const key in ctx.query) {
                raw[key] = ctx.query[key];
                keysFrom[key] = key in keysFrom ? keysFrom[key] + ',query' : 'query';
            }
        }
        if (typeof body == 'object') {
            for (const key in body) {
                raw[key] = body[key];
                keysFrom[key] = key in keysFrom ? keysFrom[key] + ',body' : 'body';
            }
        }
        ctx.raw = raw;
        await next();
    };
}
exports.default = default_1;
