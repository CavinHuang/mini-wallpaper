import { typeOrmConfig } from '../config/database';
import { isDev } from '../config/path';
import { createConnection, EntityTarget, getManager } from 'typeorm'

const fileExt = isDev ? 'ts' : 'js'

export async function typeOrmInit(logInfo: any, callback?: any) {
  logInfo('开始初始化数据库')
  return await createConnection(typeOrmConfig())
    .then((connection) => {
      // 这里可以写实体操作相关的代码
      callback && callback(connection)
    })
    .catch((error) => console.log(error))
}

/**
 * model repository
 */
export function M<T = any>(entity: EntityTarget<T>) {
  return getManager().getRepository<T>(entity)
}
