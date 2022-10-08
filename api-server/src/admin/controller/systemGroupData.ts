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
  public async list(@Query() { pageNum = 1, pageSize = 10 }: { pageSize: number, pageNum: number; }) {
    return Response.success(await this.systemGroupDataService.getPageList({ pageNum, pageSize }, undefined, (rows: SystemGroup[]) => {
      return rows.map(item => {
        item.fields = JSON.parse(item.fields)
        return item
      })
    }))
  }

  @Get('/header/:gid')
  public async headers(@Params('gid') gid: number) {
    
  }

  @Get('/:id')
  public async info(@Params('id') id: number) {
    return Response.success(await this.systemGroupDataService.info(id))
  }

  @Post('')
  public async add(@Body() params: SystemGroupDto ) {

    const validate = ['name', 'type', 'title', 'description']

    for (let i = 0; i < params.fields.length; i++) {
      const item = params.fields[i]
      for (let key in item) {
        if (!item[key] && validate.includes(key)) {
          return Response.error(`字段${i + 1}：${key}不能为空`)
        }
      }
    }

    const saveData = {
      ...params,
      fields: JSON.stringify(params.fields)
    }

    const saveRes = await this.systemGroupDataService.create(saveData)
    if (saveRes) {
      return Response.success(saveRes)
    }
    return Response.error('创建失败,请重试')
  }

  @Put('/:id')
  public async update(@Params('id') id: number, @Body() params: SystemGroupDto) {
    const validate = ['name', 'type', 'title', 'description']
    for (let i = 0; i < params.fields.length; i++) {
      const item = params.fields[i]
      for (let key in item) {
        if (!item[key] && validate.includes(key)) {
          return Response.error(`字段${i + 1}：${key}不能为空`)
        }
      }
    }

    const saveData = {
      ...params,
      fields: JSON.stringify(params.fields)
    }

    const saveRes = await this.systemGroupService.create(saveData)
    if (saveRes) {
      return Response.success(true, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  @Delete('/:id')
  public async delete(@Params('id') id: number) {
    const res = await this.systemGroupService.delete(id, true)
    if (res) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}