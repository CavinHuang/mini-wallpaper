/**
 * wechat 相关的操作
 */
import { BaseService } from './baseService'
import koa2Req from 'koa2-request'
import md5 from 'md5'
import { random } from '../utils'
import { MiniProgram } from './miniprogram'
import { redisClient } from '@/core/redis'

const enum WECHAT_URLS {
  jscode2session = 'https://api.weixin.qq.com/sns/jscode2session'
}

class Wechat extends BaseService {
  /**
   * 微信code换token
  */
  static async code2session(appid:string, code: string) {
    const miniProgramInfo = await MiniProgram.getInfoByAppid(appid)

    const requestUrl = WECHAT_URLS.jscode2session + `?appid=${miniProgramInfo.appid}&secret=${miniProgramInfo.appsecret}&js_code=${code}&grant_type=authorization_code`

    const wechatData = await Wechat.sendRequest(requestUrl)

    redisClient.set(wechatData.userToken, JSON.stringify(wechatData.data))
    redisClient.expire(wechatData.userToken, 60 * 60 * 1)

    return wechatData
  }

  /**
   * 向微信发送请求
   * @param url 
   * @returns 
   */
  static async sendRequest(url: string) {
    try {
      // 向微信服务器发送请求
      const x = await koa2Req(url)
      // 获取session_key和openid
      let userToken = md5(JSON.parse(x.body).openid + new Date().valueOf()) + random(1, 100000)
      const result = {
        data: JSON.parse(x.body),
        userToken
      }
      return result
    } catch (e) {
      console.error('请求微信：' + url + '时出错了！', e)
    }
  }
}