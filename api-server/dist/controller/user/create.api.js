"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const CoreController_1 = require("../CoreController");
const user_1 = require("../../models/entity/user");
const models_1 = require("../../models");
class UserCreate extends CoreController_1.CoreController {
    method = 'post';
    constructor() {
        super();
    }
    async handle(raw) {
        if (!raw.username || !raw.password) {
            return this.error('缺少用户名或者密码！');
        }
        if (raw.confirm_password !== raw.password) {
            return this.error('两次密码不一致');
        }
        raw.password = await bcrypt_1.default.hash(raw.password, 5);
        const user = (0, models_1.M)(user_1.User);
        const result = await user.findOne({
            where: {
                username: raw.username
            }
        });
        if (!result) {
            const UserInstance = new user_1.User();
            UserInstance.gender = raw.gender;
            UserInstance.email = raw.email;
            UserInstance.username = raw.username;
            UserInstance.password = raw.password;
            UserInstance.status = 1;
            UserInstance.create_at = new Date();
            const userRes = await user.save(UserInstance);
            if (userRes) {
                return this.success({ id: userRes.id }, '创建用户成功!');
            }
        }
        return this.error('用户已经存在!');
    }
}
exports.default = UserCreate;
