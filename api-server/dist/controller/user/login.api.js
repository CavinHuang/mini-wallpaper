"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CoreController_1 = require("../CoreController");
const user_1 = require("../../models/entity/user");
const models_1 = require("../../models");
const config_1 = require("../../config");
class UserLogin extends CoreController_1.CoreController {
    method = 'post';
    async handle(raw) {
        const user = (0, models_1.M)(user_1.User);
        const result = await user.findOne({
            where: {
                username: raw.username
            }
        });
        if (!result) {
            return this.error('用户名错误!');
        }
        if (await bcrypt_1.default.compare(raw.password, result.password)) {
            return this.success({
                user: result,
                token: jsonwebtoken_1.default.sign({
                    data: result,
                    // 设置 token 过期时间
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 // 60 seconds * 60 minutes = 1 hour
                }, config_1.secret)
            }, '登录成功!');
        }
        else {
            return this.error('密码错误!');
        }
    }
}
exports.default = UserLogin;
