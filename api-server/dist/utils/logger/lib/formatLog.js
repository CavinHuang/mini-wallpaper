"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const moment_1 = __importDefault(require("moment"));
const highlight = (str) => {
    return String(str)
        .replace(/~\[(.*?)\]/g, chalk_1.default.underline.bold('$1'))
        .replace(/~\{(.*?)\}/g, chalk_1.default.white('[$1]'));
};
function initFormattLog(langs) {
    return function formattLog({ startTime, level: { colour, levelStr }, data: datas }, isHightlight) {
        if (!datas.length) {
            return [''];
        }
        const color = colour;
        const level = langs[levelStr];
        const time = (0, moment_1.default)(startTime).format('YY-MM-DD HH:mm:ss:SSS');
        const texts = [];
        const errors = [];
        for (let i = 2; i < datas.length; i++) {
            const data = datas[i];
            if (data === undefined) {
                continue;
            }
            if (data instanceof Error || (data.stack && data.message)) {
                errors.push(data);
                texts.push(String(data.message));
            }
            else if (data.message) {
                texts.push(String(data.message));
            }
            else {
                texts.push(String(data));
            }
        }
        let where = datas[0];
        let action = datas[1];
        let resultAll = texts.join('\n\t');
        if (isHightlight) {
            where = highlight(where);
            action = highlight(action);
            resultAll = highlight(resultAll);
        }
        let logFinal = `[${time}][${level}] ${where}` + (action ? ` >  ${action}` : '') + (resultAll ? `  ${resultAll}` : '');
        if (isHightlight) {
            logFinal = chalk_1.default[color](logFinal);
        }
        const logError = [
            logFinal,
            '-------------- Stack --------------',
            errors
                .map((error) => (isHightlight ? chalk_1.default[color](highlight(error.message)) : error.message) +
                (error.stack ? `\n${String(error.stack).replace(/ {4}/g, '\t')}` : '') +
                (error.data ? `\n[Data] ${error.data}` : ''))
                .join('\n--------------\n'),
            '===================================\n'
        ].join('\n');
        return errors.length ? [logFinal, logError] : [logFinal];
    };
}
exports.default = initFormattLog;
