/**
 * admin user
 */

import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { AdminUser } from "@/models/entity/adminUser";
import { SelectQueryBuilder } from "typeorm";
import { AdminUserService } from "../service/adminUser";

@Controller('/admin-user', { skipPerm: true })
export class AdminUserController {

  @Inject('AdminUser')
  protected adminUserService: AdminUserService

  @Get('')
  public async list(@Query() { pageNum = 1, pageSize = 10, nickname = '', username = '' }: { pageSize: number, pageNum: number; nickname: string; username: string }) {
    const where: Record<string, string> = {}

    if (nickname) {
      where.nickname = nickname
    }

    
    if (username) {
      where.username = username
    }
    return Response.success(await this.adminUserService.getPageList({ pageNum, pageSize }, (query: SelectQueryBuilder<AdminUser>) => {
      query.andWhere(where)
      return query
    }))
  }

  @Get('/:id')
  public async info(@Params('id') id: number) {
    return Response.success(await this.adminUserService.info(id))
  }

  @Post('')
  public add(@Body() params: Partial<AdminUser>) {
    if (this.adminUserService.create(params)) {
      return Response.success(true)
    }
    return Response.error('error')
  }

  @Put('/:id')
  public update(@Params() id: number, @Body() params: Partial<AdminUser>) {
    if (this.adminUserService.update(id, params)) {
      return Response.success(true, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  @Delete('/:id')
  public delete(@Params() id: number) {
    if (this.adminUserService.delete(id)) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}