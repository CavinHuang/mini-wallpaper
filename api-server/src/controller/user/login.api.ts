import { userService } from './../../service/user';
import { ControllerParams } from "../../interfaces";
import { Controller, Get, Post, Use } from "../../core/decorator";
import { CoreController } from "../CoreController";
import { genValidateParams } from "../../middlewares";
import { loginParams } from "../../validator"
import { Wechat } from "../../service/wechat";
import { Response } from "../../core/responce";
import { redisClient } from '../../core/redis';

interface IGetPhone {
  nickName: string
  gender: 0 | 1 | 2
  avatarUrl: string
  openid: string
  appid: string
  pid: number
}

interface ITougao {
  typeId: number
  img: string
}

@Controller('/user')
class UserLogin extends CoreController {

  @Get('/index', { skipPerm: true })
  public async index(params: ControllerParams<{ token: string, uid: number }>) {
    const userRes = await redisClient.get(params.query.token)
    if (userRes) {
      return Response.success({...JSON.parse(userRes), token: params.query.token }, 'success')
    }

    const userRaw = await userService.getUserById(params.query.uid)
    console.log(userRaw)
    if (userRaw) {
      return Response.success(userRaw, 'success')
    }
  }

  @Use(genValidateParams('get', loginParams))
  @Get('/getOpenid', { skipPerm: true })
  public async login(params: ControllerParams<{ code: string, appid: string }>) {
    const { query } = params
    const result = await Wechat.code2session(query.appid, query.code)
    const { wechatData } = result
    const userRes = await userService.getUserByOpenId(query.appid, wechatData.openid)
    if (userRes) {
      redisClient.set(result.userToken, JSON.stringify(userRes))
      return Response.success({
        userInfo: {...userRes, token: result.userToken},
        wechatData
      }, '登录成功')
    }
    return Response.success(result, 'success')
  }

  @Get('/getphone', { skipPerm: true })
  public async getOpenid(params: ControllerParams<IGetPhone>) {
    const { query } = params
    const { appid, openid, nickName, avatarUrl, gender, pid } = query
    const userRes = await userService.getUserByOpenId(appid, openid)

    if (!userRes) {
      // 创建用户
      const saveRes = await userService.saveUserInfo({
        appid,
        openid,
        nickname: nickName,
        avatar: avatarUrl,
        gender,
        pid
      })

      if (saveRes) {
        return Response.success({
          userinfo: saveRes
        })
      }
    }

    return Response.success({
      userInfo: userRes
    })
  }

  @Post('/tougao')
  public async tougao() {}
}