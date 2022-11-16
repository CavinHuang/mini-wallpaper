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
const mare_1 = require("@/core/mare");
const parseRaw_1 = __importDefault(require("../server/mare/parseRaw"));
// const { faces, folds } = initRoute(dirController)
exports.server = {
    host: '0.0.0.0',
    port: 10089
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
        before: [parseRaw_1.default, mare_1.InitComonService, mare_1.ParseExtra, mare_1.CheckPerm],
        after: [mare_1.ParseCookies, mare_1.ResultParser]
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
