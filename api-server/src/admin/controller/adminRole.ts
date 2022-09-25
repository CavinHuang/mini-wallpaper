/**
 * admin user
 */

import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { AdminAuthRole } from '@/models/entity/adminAuthRoleMenu';
import { AdminAuthRoleService } from "../service/adminAuthRole";

@Controller('/admin-user', { skipPerm: true })
class AdminAuthRoleController {

  @Inject()
  protected adminAuthRoleService: AdminAuthRoleService

  @Get('')
  public info(@Query() { pageNo = 1, pageSize = 10 }: { pageSize: number, pageNo: number }) {

  }

  @Post('')
  public add(@Body() params: Partial<AdminAuthRole>) {
    if (this.adminAuthRoleService.create(params)) {
      return Response.success(true)
    }
    return Response.error('error')
  }

  @Put('/:id')
  public update(@Params() id: number, @Body() params: Partial<AdminAuthRole>) {
    if (this.adminAuthRoleService.update(id, params)) {
      return Response.success(true, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  @Delete('/:id')
  public delete(@Params() id: number) {
    if (this.adminAuthRoleService.delete(id)) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}