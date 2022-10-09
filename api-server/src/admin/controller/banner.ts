/**
 * admin user
 */

import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { AdminAuthMenu } from "@/models/entity/adminAuthMenu";
import { AdminAuthMenuService } from "../service/adminAuthMenu";
import { SystemGroupDataService } from "../service/systemGroupData";

const groupDataKey = 'banner_position'

@Controller('/banner', { skipPerm: true })
export class AdminAuthMenuController {

  @Inject()
  protected adminAuthMenuService: AdminAuthMenuService

  @Inject()
  protected systemGroupDataService: SystemGroupDataService

  @Get('/position')
  public async getPosition() {
    const positions = await this.systemGroupDataService.getConfigNameValue(groupDataKey)
    console.log("🚀 ~ file: banner.ts ~ line 26 ~ AdminAuthMenuController ~ getPosition ~ positions", positions)
    return Response.success(positions, Response.successMessage)
  }

  @Get('')
  public async list(@Query() { keyword = '', hidden }: { keyword?: string, hidden?: boolean }) {
    const listData = await this.adminAuthMenuService.getTreeList()

    return Response.success(listData)
  }

  @Post('')
  public add(@Body() params: Partial<AdminAuthMenu>) {
    if (this.adminAuthMenuService.create(params)) {
      return Response.success(true)
    }
    return Response.error('error')
  }

  @Put('/:id')
  public update(@Params('id') id: number, @Body() params: Partial<AdminAuthMenu>) {
    if (this.adminAuthMenuService.update(id, params)) {
      return Response.success(true, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  @Delete('/:id')
  public delete(@Params('id') id: number) {
    if (this.adminAuthMenuService.delete(id)) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}