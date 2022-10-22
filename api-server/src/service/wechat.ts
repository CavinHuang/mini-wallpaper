/**
 * wechat 相关的操作
 */
import { BaseService } from './baseService'
import koa2Req from 'koa2-request'
import { BusinessError } from '@/core/error/businessError'
import { BUSINESS_ERROR_CODE } from '@/core/error/businessError'
import { Inject } from '@/core/container'
import { MiniProgramService } from '@/admin/service/miniProgram'

const enum WECHAT_URLS {
  jscode2session = 'https://api.weixin.qq.com/sns/jscode2session'
}

export class Wechat extends BaseService {

  @Inject()
  public miniprogramService: MiniProgramService 

  /**
   * 微信code换token
  */
  async code2session(appid:string, code: string) {
    const miniProgramInfo = await this.miniprogramService.getInfo({
      appid
    })

    const requestUrl = WECHAT_URLS.jscode2session + `?appid=${miniProgramInfo.appid}&secret=${miniProgramInfo.appsecret}&js_code=${code}&grant_type=authorization_code`
    console.log('请求', requestUrl)
    const wechatData = await Wechat.sendRequest(requestUrl)
    console.log("🚀 ~ file: wechat.ts ~ line 31 ~ Wechat ~ code2session ~ wechatData", wechatData)

    if (wechatData.wechatData.errcode) {
      throw new BusinessError(BUSINESS_ERROR_CODE.WECHAT_CODE_ERROR, '授权不正确')
    }

    // redisClient.set(wechatData.userToken, JSON.stringify(wechatData.wechatData))
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
      return JSON.parse(x.body)
    } catch (e) {
      console.error('请求微信：' + url + '时出错了！', e)
    }
  }
}