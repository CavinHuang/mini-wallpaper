import { database } from '../config/database';
import { isDev } from '../config/path';
import 'reflect-metadata'
import { createConnection, EntityTarget, getManager } from 'typeorm'
import { User } from './entity/user'
import bcrypt from 'bcrypt'

async function initDevelopAdmin(logInfo) {
  const user = M(User)
  const result = await user.findOne({
    where: {
      username: 'admin'
    }
  })

  if (!result) {
    const raw = user.create({
      username: 'admin',
      password: await bcrypt.hash('123456', 5),
      email: 'admin@qq.com',
      gender: 1,
      status: 1,
      create_at: new Date()
    })
    const userRes = await user.save(raw)

    if (userRes) {
      logInfo('√初始化管理员成功')
    }
  } else {
    logInfo('无需初始化管理员')
  }
}
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
    logging: true
  })
    .then((connection) => {
      // 这里可以写实体操作相关的代码
      callback && callback(connection)
      logInfo('初始化管理员：admin / 123456')
      initDevelopAdmin(logInfo)
      logInfo('√初始化数据库成功')
    })
    .catch((error) => console.log(error))
}

/**
 * model repository
 */
export function M<T = any>(entity: EntityTarget<T>) {
  return getManager().getRepository<T>(entity)
}
