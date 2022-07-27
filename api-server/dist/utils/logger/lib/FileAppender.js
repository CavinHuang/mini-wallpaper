"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const os_1 = require("os");
const streamroller_1 = __importDefault(require("streamroller"));
// eslint-disable-next-line no-console
const consoleError = console.error.bind(console);
const openTheStream = function (path, sizeFileLog, countBuckup, option) {
    return new streamroller_1.default.RollingFileStream(path, sizeFileLog, countBuckup, option)
        .on('error', (err) => consoleError('log4js.fileAppender - Writing to file %s, error happened ', path, err))
        .on('drain', () => process.emitWarning('log4js:pause', ''));
};
const fileAppender = function (path, sizeFileLog, countBackup, option) {
    path = path_1.default.normalize(path);
    countBackup = countBackup === undefined ? 5 : countBackup;
    countBackup = countBackup === 0 ? 1 : countBackup;
    let writer = openTheStream(path, sizeFileLog, countBackup, option);
    const app = function (event) {
        if (option.removeColor === true) {
            // eslint-disable-next-line no-control-regex
            const regex = /\x1b[[0-9;]*m/g;
            event.data = event.data.map((d) => {
                if (typeof d === 'string')
                    return d.replace(regex, '');
                return d;
            });
        }
        if (typeof option.handle != 'function') {
            throw TypeError('option.handle must be a Function');
        }
        const log = option.handle(event, option.isHightlight);
        if (log !== undefined && !writer.write(log + (option.eol ?? os_1.EOL), 'utf8')) {
            process.emitWarning('log4js:pause', '');
        }
    };
    app.reopen = function () {
        writer.end(() => (writer = openTheStream(path, sizeFileLog, countBackup, option)));
    };
    app.sighupHandler = function () {
        app.reopen();
    };
    app.shutdown = function (complete) {
        process.removeListener('SIGHUP', app.sighupHandler);
        writer.end('', 'utf-8', complete);
    };
    process.on('SIGHUP', app.sighupHandler);
    return app;
};
const configureFile = function (config) {
    return fileAppender(config.path, config.maxLogSize, config.backups, config);
};
exports.default = configureFile;
