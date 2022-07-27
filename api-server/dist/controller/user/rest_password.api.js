"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const CoreController_1 = require("../CoreController");
const user_1 = require("../../models/entity/user");
const models_1 = require("../../models");
class UserRestPassword extends CoreController_1.CoreController {
    method = 'post';
    constructor() {
        super();
    }
    async handle(raw) {
        const user = (0, models_1.M)(user_1.User);
        if (raw.confirm_password !== raw.password) {
            return this.error('两次密码不一致');
        }
        const result = await user.findOne({
            where: {
                id: raw.id
            }
        });
        if (!result) {
            return this.error('用户不存在');
        }
        raw.password = await bcrypt_1.default.hash(raw.password, 5);
        try {
            const res = user.create(raw);
            const result = await user.save(res);
            return this.success(true, '成功!');
        }
        catch (e) {
            return this.error('更新失败，请重试!');
        }
    }
}
exports.default = UserRestPassword;
