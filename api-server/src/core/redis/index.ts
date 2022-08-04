// redis配置参数
import { redis as redisConfig } from '../../config/database'
import Redis, { RedisKey } from 'ioredis'

let redisClient: Redis = null
function connect() {
  if (redisClient) return redisClient
  else {
    redisClient = new Redis({
      port: redisConfig.port, // Redis port
      host: redisConfig.host, // Redis host
      // username: "default", // needs Redis >= 6
      password: redisConfig.pass,
      db: 0, // Defaults to 0
    })
  }
}

export const redisGet = async <T>(key: string, json = true): Promise<T> => {
  connect()
  const res = await redisClient.get(key)
  return res ? ( json ? JSON.parse(res) :res ) : null
}

export const redisSet = (key: string, data: any, json = true) => {
  connect()
  const res = redisClient.set(key, json ? JSON.stringify(data) :data)
  return res
}

connect()

export {
  redisClient,
}