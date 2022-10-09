import NodeCache from 'node-cache'
import { redisClient } from '@/core/redis';
import Redis from 'ioredis';
import { promisify } from 'util'

export class CacheService {
  private localCacheEnable: boolean
  private redisEnable: boolean
  private nodeCache: NodeCache
  private client: Redis

  cconstructor(localCacheEnable=true, redisEnable=true) {
    this.localCacheEnable = localCacheEnable;
    this.redisEnable = redisEnable;
    if(localCacheEnable){
        this.nodeCache = new NodeCache();
    }
    if(redisEnable) {
        this.client = redisClient
    }
  }

  /**
   * 
   * @description 获取缓存信息
   * @param {string} key 
   */
  async get(key) {
    let value;
    if(this.localCacheEnable) {
        value = this.nodeCache.get(key);
        console.log(`local value is ${value}`);
    }
    if(!value && this.redisEnable) {
        try {
            value = await promisify(this.client.get).bind(this.client)(key);
            console.log(`redis value is ${value}`)
        } catch (err){
            console.log(err);
        }
    }
    return value;
  }

  /**
   * 
   * @description 保存缓存信息
   * @param {string} key 缓存key
   * @param {string} value 缓存值
   * @param {int} expire 过期时间/秒
   * @param {boolean} cacheLocal 是否本地缓存
   */
  async set(key, value, expire=10, cacheLocal=false) {
    let localCacheRet, redisRet;
    if(this.localCacheEnable && cacheLocal) {
        localCacheRet = this.nodeCache.set(key, value, expire);
    }
    if(this.redisEnable) { 
      try {
        redisRet = await promisify(this.client.set).bind(this.client)(key, value, 'EX', expire);
      } catch (err){
        console.log(err);
      }
    }
    return localCacheRet || redisRet;
  }
}