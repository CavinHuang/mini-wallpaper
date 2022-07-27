"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToUnderline = void 0;
/**
 * 驼峰转
 * @param name
 * @returns
 */
function camelToUnderline(camelStr, division = '_') {
    return camelStr
        .replace(/\s*/g, '')
        .replace(/[A-Z]/g, function (s) {
        return ' ' + s.toLowerCase();
    })
        .trim()
        .replace(/ /g, division);
}
exports.camelToUnderline = camelToUnderline;
