// redis配置参数
import { redis as redisConfig } from '../../config'
import redis from 'redis'

let redisClient = null
function connect() {
  if (redisClient) return redisClient
  else {
    redisClient = redis.createClient(redisConfig.host, redisConfig.port, { ...(redisConfig.pass ? {auth_pass: redisConfig.pass } : {})})
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