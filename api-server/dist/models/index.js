"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.M = exports.typeOrmInit = void 0;
const path_1 = require("../config/path");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function initDevelopAdmin(logInfo) {
    const user = M(user_1.User);
    const result = await user.findOne({
        where: {
            username: 'admin'
        }
    });
    if (!result) {
        const raw = user.create({
            username: 'admin',
            password: await bcrypt_1.default.hash('123456', 5),
            email: 'admin@qq.com',
            gender: 1,
            status: 1,
            create_at: new Date()
        });
        const userRes = await user.save(raw);
        if (userRes) {
            logInfo('√初始化管理员成功');
        }
    }
    else {
        logInfo('无需初始化管理员');
    }
}
const fileExt = path_1.isDev ? 'ts' : 'js';
function typeOrmInit(logInfo, callback) {
    logInfo('开始初始化数据库');
    return (0, typeorm_1.createConnection)({
        type: 'mariadb',
        host: 'localhost',
        port: 3306,
        // username: 'cavin',
        // password: '123456',
        username: 'dokiHub',
        password: 'dokiHub@2022',
        database: 'game-mange',
        entities: [__dirname + `/entity/*.${fileExt}`],
        migrations: [__dirname + `/migration/*.${fileExt}`],
        subscribers: [__dirname + `/subscriber/*.${fileExt}`],
        synchronize: true,
        logging: true
    })
        .then((connection) => {
        // 这里可以写实体操作相关的代码
        callback && callback(connection);
        logInfo('初始化管理员：admin / 123456');
        initDevelopAdmin(logInfo);
        logInfo('√初始化数据库成功');
    })
        .catch((error) => console.log(error));
}
exports.typeOrmInit = typeOrmInit;
/**
 * model repository
 */
function M(entity) {
    return (0, typeorm_1.getManager)().getRepository(entity);
}
exports.M = M;
