import { Inject } from "@/core/container";
import { Controller, Get, Header, Query } from "@/core/decorator";
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
  public async getUserOpenId(@Query() code: string, @Header() appId: string) {
    const openIdRes = await this.wechatService.code2session(appId, code)
    const userRes = await this.userService.getInfoByQueryBuilder<User>((query)=>{
      query.leftJoinAndSelect("user.profile", "profile")
      query.where({
        'profile.openid': openIdRes.openId
      })
      return query
    }, 'user')

    if (!userRes) {
      const userInfo = await this.userService.doRegister({ openid: openIdRes.openId })
      return Response.success(userInfo, 'register')
    }
    return Response.success(userRes, Response.successMessage)
  }

}