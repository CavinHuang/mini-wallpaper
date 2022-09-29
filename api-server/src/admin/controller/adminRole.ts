/**
 * admin user
 */

import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { AdminAuthRole } from '@/models/entity/adminAuthRole';
import { SelectQueryBuilder } from "typeorm";
import { AdminAuthRoleService } from "../service/adminAuthRole";

@Controller('/role', { skipPerm: true })
export class AdminAuthRoleController {

  @Inject()
  protected adminAuthRoleService: AdminAuthRoleService

  @Get('')
  public async list(@Query() { pageNum = 1, pageSize = 10, role_name = '', role_code = '' }: { pageSize: number, pageNum: number; role_name: string; role_code: string }) {
    const where: Record<string, string> = {}

    if (role_name) {
      where['ar.role_name'] = role_name
    }
    
    if (role_code) {
      where['ar.role_code'] = role_code
    }
    return Response.success(await this.adminAuthRoleService.getPageList(
      { pageNum, pageSize, alias: 'ar' },
      (query) => {
        query.leftJoinAndSelect('ar.menus', 'm')
        query.where(where)
        return query
      }
    ))
  }

  @Get('/:id')
  public async info(@Params('id') id: number) {
    return Response.success(await this.adminAuthRoleService.info(id))
  }

  @Post('')
  public async add(@Body() params: Partial<AdminAuthRole> & { role_auth: number[] }) {
    // const result = await this.adminAuthRoleService.create(params)
    const menuSaveRes = await this.adminAuthRoleService.saveRole(params)
    if (menuSaveRes) {
      return Response.success(true)
    }
    return Response.error('error')
  }

  @Put('/:id')
  public async update(@Params('id') id: number, @Body() params: Partial<AdminAuthRole> & { role_auth: number[] }) {
    const menuSaveRes = await this.adminAuthRoleService.saveRole({...params, id})
    if (menuSaveRes) {
      return Response.success(true, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  @Delete('/:id')
  public async delete(@Params('id') id: number) {
    const res = await this.adminAuthRoleService.deleteRelationData(id)
    if (res) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}