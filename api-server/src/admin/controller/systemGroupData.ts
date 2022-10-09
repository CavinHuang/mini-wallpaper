/**
 * admin user
 */

import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { SystemGroup } from "@/models/entity/systemGroup";
import { SystemGroupDto } from "../dto/systemGroup";
import { SystemGroupDataService } from "../service/systemGroupData";
import { SystemGroupService } from '../service/systemGroup';

@Controller('/system-group-data', { skipPerm: true })
export class SystemGroupDataController {

  @Inject()
  protected systemGroupDataService: SystemGroupDataService

  @Inject()
  protected systemGroupService: SystemGroupService

  @Get('')
  public async list(@Query() { pageNum = 1, pageSize = 10, gid = 0 }: { pageSize: number, pageNum: number; gid: number}) {
   const res = await this.systemGroupDataService.getGroupDataList({ pageNum, pageSize, gid })
   return Response.success(res, Response.successMessage)
  }

  @Get('/header/:gid')
  public async headers(@Params('gid') gid: number) {
    return Response.success(await this.systemGroupService.getGroupDataTabHeader(gid))
  }

  @Get('/:id')
  public async info(@Params('id') id: number) {
    return Response.success(await this.systemGroupDataService.info(id))
  }

  @Post('')
  public async add(@Body() params: Record<string, any> ) {

    const systemGroupRes = await this.systemGroupService.info(params.gid)
    const fields = JSON.parse(systemGroupRes.fields)

    const value = {}
    for (let key in params) {
      const param = params[key]
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        if (key === field.title) {
          value[key] = {}
          if (param === '') {
            return Response.error(`${field.name}不能为空`)
          } else {
            value[key].type = field.type,
            value[key].value = param
          }
        }
      }
    }

    const saveData = {
      gid: params.gid,
      add_time: new Date(),
      value: JSON.stringify(value),
      sort: params.sort || 0,
      status: params.status || 0
    }
    
    const saveRes = await this.systemGroupDataService.create(saveData)
    if (saveRes) {
      return Response.success(saveRes)
    }
    return Response.error('创建失败,请重试')
  }

  @Put('/:id')
  public async update(@Params('id') id: number, @Body() params: Record<string, any>) {
    const systemGroupRes = await this.systemGroupService.info(params.gid)
    const fields = JSON.parse(systemGroupRes.fields)

    const value = {}
    for (let key in params) {
      const param = params[key]
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        if (key === field.title) {
          value[key] = {}
          if (param === '') {
            return Response.error(`${field.name}不能为空`)
          } else {
            value[key].type = field.type,
            value[key].value = param
          }
        }
      }
    }
    console.log('value', value)
    const saveData = {
      value: JSON.stringify(value),
      sort: params.sort || 0,
      status: params.status || 0
    }

    const saveRes = await this.systemGroupDataService.update(id, saveData)
    if (saveRes) {
      return Response.success(saveRes, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  @Delete('/:id')
  public async delete(@Params('id') id: number) {
    const res = await this.systemGroupDataService.delete(id, true)
    if (res) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}