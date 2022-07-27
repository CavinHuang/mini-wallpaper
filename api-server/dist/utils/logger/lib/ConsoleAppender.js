"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_update_1 = __importDefault(require("log-update"));
const LogUpdateSymbol_1 = __importDefault(require("./LogUpdateSymbol"));
const LogDoneSymbol_1 = __importDefault(require("./LogDoneSymbol"));
// eslint-disable-next-line no-console
const consoleLog = console.log.bind(console);
// eslint-disable-next-line no-console
const consoleError = console.error.bind(console);
const configureConsole = function (config) {
    return function (event) {
        let symbolLog;
        if (event.data[0] === LogUpdateSymbol_1.default || event.data[0] === LogDoneSymbol_1.default) {
            symbolLog = event.data.shift();
        }
        const [logFinal, logError, lengthError] = config.handle(event, config.isHightlight);
        if (symbolLog === LogUpdateSymbol_1.default) {
            (0, log_update_1.default)(logFinal);
        }
        else if (symbolLog === LogDoneSymbol_1.default) {
            (0, log_update_1.default)(logFinal);
            log_update_1.default.done();
        }
        else {
            consoleLog(logFinal);
        }
        if (lengthError) {
            consoleError(logError);
        }
    };
};
exports.default = configureConsole;
