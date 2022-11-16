"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M = exports.typeOrmInit = void 0;
const database_1 = require("../config/database");
const path_1 = require("../config/path");
const typeorm_1 = require("typeorm");
const fileExt = path_1.isDev ? 'ts' : 'js';
async function typeOrmInit(logInfo, callback) {
    logInfo('开始初始化数据库');
    return await (0, typeorm_1.createConnection)({
        type: database_1.database.type,
        host: database_1.database.host,
        port: database_1.database.port,
        username: database_1.database.username,
        password: database_1.database.password,
        database: database_1.database.database,
        entities: [__dirname + `/entity/*.${fileExt}`],
        migrations: [__dirname + '/migration/*.${fileExt}'],
        subscribers: [__dirname + '/subscriber/*.${fileExt}'],
        synchronize: false,
        logging: true
    })
        .then((connection) => {
        // 这里可以写实体操作相关的代码
        callback && callback(connection);
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
