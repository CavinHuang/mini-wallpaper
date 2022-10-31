import { Inject } from "@/core/container";
import { Body, Controller, Get, Header, Params, Post, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { User } from "@/models/entity/user";
import { UserService } from "@/service/userService";
import { Wechat } from "@/service/wechat";

@Controller('/user', { skipPerm: true })
export class UserController {
  @Inject()
  private userService: UserService

  @Inject()
  private wechatService: Wechat

  @Get('/openId')
  public async getUserOpenId(@Query('code') code: string, @Header('appid') appId: string) {
    const openIdRes = await this.wechatService.code2session(appId, code)
    let openId = openIdRes.openid
    const userRes = await this.userService.getInfoByQueryBuilder<User>((query)=>{
      query.leftJoinAndSelect('user.profile', 'profile')
           .leftJoinAndSelect('user.creator', 'creator')
           .where('profile.openid = :openId', { openId })
      return query
    }, 'user')

    if (!userRes) {
      const userInfo = await this.userService.doRegister({ openid: openIdRes.openid, appid: appId })
      return Response.success({userInfo, loginInfo: openIdRes, needUpdate: true}, 'register')
    }
    return Response.success({ useInfo: userRes, loginInfo: openIdRes, needUpdate: false }, Response.successMessage)
  }

  @Get('/info/:id')
  public async getUserInfo(@Params('id') id: number) {
    const userRes = await this.userService.getInfoByQueryBuilder<User>((query)=>{
      query.leftJoinAndSelect('user.profile', 'profile')
           .leftJoinAndSelect('user.creator', 'creator')
           .where('user.id = :id', { id })
      return query
    }, 'user')

    return Response.success(userRes, Response.successMessage)
  }

  @Post('/updateInfo')
  public async updateUserInfo(@Body() params: any) {
    return Response.success(await this.userService.updateUserInfo({...params.userInfo, openid: params.openid}), Response.successMessage)
  }

}