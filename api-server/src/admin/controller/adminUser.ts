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
  /**
   * 获取注入的service
   */
  @Inject()
  protected adminUserService: AdminUserService

  /**
   * 获取列表
   * @param param 查询条件 
   * @returns 
   */
  @Get('')
  public async list(@Query() { pageNum = 1, pageSize = 10, nickname = '', username = '' }: { pageSize: number, pageNum: number; nickname: string; username: string }) {
    const where: Record<string, string> = {}

    if (nickname) {
      where['au.nickname'] = nickname
    }
    
    if (username) {
      where['au.username'] = username
    }
    return Response.success(await this.adminUserService.getPageList(
      { pageNum, pageSize, alias: 'au' },
      (query: SelectQueryBuilder<AdminUser>) => {
        query.leftJoinAndSelect('au.roles', 'r')
        query.andWhere(where)
        return query
    }))
  }

  /**
   * 获取单个信息
   * @param id 
   * @returns 
   */
  @Get('/:id')
  public async info(@Params('id') id: number) {
    return Response.success(await this.adminUserService.info(id))
  }

  /**
   * 创建
   * @param params 
   * @returns 
   */
  @Post('')
  public async add(@Body() params: Partial<AdminUser> & { confirm_password: string; role_id: number }) {
    if (params.password !== params.confirm_password) {
      return Response.error('两次密码不一致')
    }
    const { password, slat } = this.adminUserService.genUserPassword(params.password)
    params.password = password
    params.slat = slat
    const saveParams = { ...params, role_auth: [params.role_id], role_id: undefined }
    const userSaveRes = await this.adminUserService.saveAdminUser(saveParams)
    if (userSaveRes) {
      return Response.success(true)
    }
    return Response.error('创建失败,请重试')
  }

  /**
   * 更新单个
   * @param id 
   * @param params 
   * @returns 
   */
  @Put('/:id')
  public async update(@Params('id') id: number, @Body() params: Partial<AdminUser> & { role_id: number }) {
    const saveParams = { ...params, role_auth: [params.role_id], role_id: undefined }
    const userSaveRes = await this.adminUserService.saveAdminUser(saveParams)
    if (userSaveRes) {
      return Response.success(true, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  /**
   * 修改密码
   * @param params 
   * @returns 
   */
  @Post('/changePwd')
  public async changePwd(@Body() params: Partial<AdminUser> & { confirm_password: string }) {
    if (params.password !== params.confirm_password) {
      return Response.error('两次密码不一致')
    }
    const { password, slat } = this.adminUserService.genUserPassword(params.password)
    params.password = password
    params.slat = slat
    if (await this.adminUserService.update(params.id, params)) {
      return Response.success(true, '更新密码成功')
    }
    return Response.error('更新密码失败，请重试')
  }

  /**
   * 删除
   * @param id 
   * @returns 
   */
  @Delete('/:id')
  public async delete(@Params('id') id: number) {
    const res = await this.adminUserService.deleteRelationData(id)
    if (res) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}