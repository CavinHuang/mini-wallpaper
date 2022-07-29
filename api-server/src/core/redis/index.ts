// redis配置参数
import { redis as redisConfig } from '../../config'
import Redis from 'ioredis'

let redisClient = null
function connect() {
  if (redisClient) return redisClient
  else {
    //redisConfig.host, redisConfig.port, { ...(redisConfig.pass ? {auth_pass: redisConfig.pass } : {})}
    //redis[s]://[[username][:password]@][host][:port]
    redisClient = new Redis({
      port: redisConfig.port, // Redis port
      host: redisConfig.host, // Redis host
      // username: "default", // needs Redis >= 6
      password: redisConfig.pass,
      db: 0, // Defaults to 0
    })
  }
}

async function get(key: string | number) {
  connect()
  return new Promise((resovle, reject) => {
    redisClient.get(key, (err, reply) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resovle(reply)
    })
  })
}
async function set(key, value) {
  connect()
  return new Promise((resovle, reject) => {
    redisClient.set(key, value, (err, reply) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resovle(reply)
    })
  })
}

connect()

export {
  redisClient,
  get,
  set
}