import path from 'path' 
import { DataSourceOptions } from 'typeorm'
import { isDev } from "./path"
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_TYPE } = process.env
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1 '
const REDIS_PORT = process.env.REDIS_PORT || 6379

console.log('DB_HOST', DB_HOST)
console.log('DB_PORT', DB_PORT)
console.log('DB_USERNAME', DB_USERNAME)
console.log('DB_PASSWORD', DB_PASSWORD)

const fileExt = isDev ? 'ts' : 'js'

export const database = {
  type: DB_TYPE, // 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME
} as const

export const redis: {
  host: string,
  port: number,
  pass?: string
} = {
  host: REDIS_HOST,
  port: Number(REDIS_PORT)
    // pass: 'wangmiao11111'
}

export const typeOrmConfig = () => {
  return {
    type: database.type,
    host: database.host,
    port: database.port,
    username: database.username,
    password: database.password,
    database: database.database,
    entities: [path.join(__dirname, `../models/entity/*.${fileExt}`)],
    migrations: [path.join(__dirname, `../models/migration/*.${fileExt}`)],
    subscribers: [path.join(__dirname, `../models/subscriber/*.${fileExt}`)],
    synchronize: true,
    logging: true,
    cli: {
      migrationsDir: 'src/models/migration',
    }
  }
}