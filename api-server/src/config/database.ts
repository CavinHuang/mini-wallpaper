export const database = {
  type: 'mariadb',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '123456',
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