"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionLogger = void 0;
const path_1 = require("./path");
// 日志
exports.optionLogger = {
    name: 'sem-web',
    level: 'all',
    dir: path_1.dirLogs,
    option: {
        lang: 'zh_cn',
        isLogPathSave: true
    }
};
