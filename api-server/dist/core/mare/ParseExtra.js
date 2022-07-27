"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initMareParseExtra = ($) => {
    return async (ctx, next) => {
        const raw = ctx.raw || (ctx.raw = {});
        raw._files = ctx.files;
        raw._ip = ctx.ip;
        raw.token = ctx.cookies.get('token') ?? raw.token;
        await next();
    };
};
exports.default = initMareParseExtra;
