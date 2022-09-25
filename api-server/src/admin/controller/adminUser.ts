/**
 * admin user
 */

import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { AdminUser } from "@/models/entity/adminUser";
import { AdminUserService } from "../service/adminUser";

@Controller('/admin-user', { skipPerm: true })
class AdminUserController {

  @Inject()
  protected adminUserService: AdminUserService

  @Get('')
  public info(@Query() { pageNo = 1, pageSize = 10 }: { pageSize: number, pageNo: number }) {

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