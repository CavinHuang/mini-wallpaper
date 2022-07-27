"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = exports.wock = exports.path = exports.facePrefix = exports.name = exports.server = void 0;
const path_1 = require("./path");
const path_2 = require("path");
const crypto_1 = require("./crypto");
const utils_1 = require("../utils");
// import initRoute from './core/initRoute'
const ParseExtra_1 = __importDefault(require("../core/mare/ParseExtra"));
const CheckPerm_1 = __importDefault(require("../core/mare/CheckPerm"));
const ParseCookies_1 = __importDefault(require("../core/mare/ParseCookies"));
const ResultParser_1 = __importDefault(require("../core/mare/ResultParser"));
const parseRaw_1 = __importDefault(require("../server/mare/parseRaw"));
// const { faces, folds } = initRoute(dirController)
exports.server = {
    host: '0.0.0.0',
    port: 10088
};
exports.name = 'GameApi';
exports.facePrefix = '/api';
// 文件保存路径
exports.path = {
    arch: 'E://Archive'
};
exports.wock = {
    disable: false,
    route: 'wock',
    ping: false
};
exports.serverConfig = {
    favicon: (0, path_2.resolve)(path_1.dirPublic, 'favicon.ico'),
    middleware: {
        before: [parseRaw_1.default, ParseExtra_1.default, CheckPerm_1.default],
        after: [ParseCookies_1.default, ResultParser_1.default]
    },
    name: exports.name,
    server: exports.server,
    path: exports.path,
    facePrefix: exports.facePrefix,
    wock: exports.wock,
    crypto: crypto_1.crypto,
    // faces, folds,
    logger: utils_1.logger
};
