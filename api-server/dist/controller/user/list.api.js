"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreController_1 = require("../CoreController");
const user_1 = require("../../models/entity/user");
const models_1 = require("../../models");
const Pagination_1 = require("../../core/pagination/Pagination");
class UserList extends CoreController_1.CoreController {
    method = 'post';
    async handle(raw) {
        const user = (0, models_1.M)(user_1.User);
        const { pageNum = 1, pageSize = 10, username, gender } = raw;
        let query = user.createQueryBuilder('').where('1 = 1');
        if (username) {
            query = query.andWhere('user.username = :username', { username });
        }
        if (gender) {
            query.andWhere('user.gender = :gender', { gender });
        }
        const result = await Pagination_1.Pagination.findByPage(query, { pageNum, pageSize });
        return this.success(result, '成功');
    }
}
exports.default = UserList;
