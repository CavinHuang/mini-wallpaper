import { database } from '../config/database';
import { isDev } from '../config/path';
import { createConnection, EntityTarget, getManager } from 'typeorm'

const fileExt = isDev ? 'ts' : 'js'

export function typeOrmInit(logInfo: any, callback?: any) {
  logInfo('开始初始化数据库')
  return createConnection({
    type: database.type,
    host: database.host,
    port: database.port,
    username: database.username,
    password: database.password,
    database: database.database,
    entities: [__dirname + `/entity/*.${fileExt}`],
    migrations: [__dirname + '/migration/*.${fileExt}'],
    subscribers: [__dirname + '/subscriber/*.${fileExt}'],
    synchronize: true,
    logging: false
  })
    .then((connection) => {
      // 这里可以写实体操作相关的代码
      callback && callback(connection)
      // logInfo('初始化管理员：admin / 123456')
      // logInfo('√初始化数据库成功')
    })
    .catch((error) => console.log(error))
}

/**
 * model repository
 */
export function M<T = any>(entity: EntityTarget<T>) {
  return getManager().getRepository<T>(entity)
}
