"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomId = exports.camelToUnderline = void 0;
const crypto = __importStar(require("crypto"));
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
/**
 * generate a lightweight 32 bit random id, enough for ioc container
 */
function generateRandomId() {
    // => f9b327e70bbcf42494ccb28b2d98e00e
    return crypto.randomBytes(16).toString('hex');
}
exports.generateRandomId = generateRandomId;
