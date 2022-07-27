/**
 * wechat 相关的操作
 */
import { BaseService } from './baseService'
import koa2Req from 'koa2-request'
import md5 from 'md5'
import { random } from '../utils'

const enum WECHAT_URLS {
  jscode2session = 'https://api.weixin.qq.com/sns/jscode2session'
}

class Wechat extends BaseService {
  static code2session(code: string) {

  }

  /**
   * 向微信发送请求
   * @param url 
   * @returns 
   */
  static async sendRequest(url: string) {
    try {
      let result = {}
      // 向微信服务器发送请求
      const x = await koa2Req(url)
      // 获取session_key和openid
      let userToken = md5(JSON.parse(x.body).openid + new Date().valueOf()) + random(1, 100000)
      result = {
        data: JSON.parse(x.body),
        userToken
      }
      return result
    } catch (e) {
      console.error('请求微信：' + url + '时出错了！', e)
    }
  }
}