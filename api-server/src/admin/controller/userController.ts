/**
 * User Controller
 */
import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { User } from "@/models/entity/user";
import { UserService } from "../service/userService";

@Controller('/user', { skipPerm: true })
export class UserAdminController {
  @Inject()
  protected adminuserService: UserService

  @Get('')
  public async list(@Query() { pageNum = 1, pageSize = 10 }: { pageSize: number, pageNum: number; }) {
    const listData = await this.adminuserService.getPageList({ pageNum, pageSize, getRayMany: true, alias: 'user' }, (query) => {
      query.leftJoinAndSelect('user.profile', 'profile')
      query.select(`
        user.id as user_id,
        user.username as username,
        user.score as score,
        user.status as status,
        user.vip_level as vip_level,
        profile.appid as appid,
        profile.avatar as avatar,
        profile.nickname as nickname,
        profile.country as country,
        profile.city as city,
        profile.province as province,
        profile.openid as openid,
        profile.gender as gender
      `)
      return query
    })
    return Response.success(listData)
  }

  @Post('')
  public add(@Body() params: Partial<User>) {
    if (this.adminuserService.create(params)) {
      return Response.success(true)
    }
    return Response.error('error')
  }

  @Put('/:id')
  public update(@Params('id') id: number, @Body() params: Partial<User>) {
    if (this.adminuserService.update(id, params)) {
      return Response.success(true, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  @Delete('/:id')
  public delete(@Params('id') id: number) {
    if (this.adminuserService.delete(id)) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}