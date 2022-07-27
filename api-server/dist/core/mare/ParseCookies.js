"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const initMareParseCookies = ($) => {
    return async (ctx, next) => {
        const cookiesAdd = ctx.body?._cookiesAdd;
        if (cookiesAdd) {
            delete ctx.body._cookiesAdd;
            for (const key in cookiesAdd) {
                const cookie = cookiesAdd[key];
                if (cookie?.option?.expires) {
                    cookie.option.expires = (0, moment_1.default)(cookie.option.expires, 'YYYY-MM-DD HH:mm:ss').toDate();
                }
                ctx.cookies.set(key, cookie.value, cookie.option);
            }
        }
        await next();
    };
};
exports.default = initMareParseCookies;
