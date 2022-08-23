const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env

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
  host: '127.0.0.1',
  port: 6379
    // pass: 'wangmiao11111'
}