const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env
const REDIS_HOST = process.env.REDIS_HOST || '175.178.179.97'
const REDIS_PORT = process.env.REDIS_PORT || 6379
console.log('DB_HOST', DB_HOST)
console.log('DB_PORT', DB_PORT)
console.log('DB_USERNAME', DB_USERNAME)
console.log('DB_PASSWORD', DB_PASSWORD)

export const database = {
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: 'mini-cms'
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