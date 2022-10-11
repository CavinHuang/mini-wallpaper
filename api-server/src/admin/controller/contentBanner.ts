/**
 * admin user
 */

import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { AdminAuthMenu } from "@/models/entity/adminAuthMenu";
import { AdminAuthMenuService } from "../service/adminAuthMenu";
import { SystemGroupDataService } from "../service/systemGroupData";
import { BannerService } from '../service/bannerService';
import { ContentBanner } from "@/models/entity/contentBanner";

const groupDataKey = 'banner_position'

@Controller('/banner', { skipPerm: true })
export class ContentBannerController {
  @Inject()
  protected adminAuthMenuService: AdminAuthMenuService

  @Inject()
  protected systemGroupDataService: SystemGroupDataService

  @Inject()
  protected bannerService: BannerService

  @Get('/position')
  public async getPosition() {
    const positions = await this.systemGroupDataService.getConfigNameValue(groupDataKey)
    return Response.success(positions, Response.successMessage)
  }

  @Get('')
  public async list(@Query() { pageNum = 1, pageSize = 10, position = '' }: { pageSize: number, pageNum: number; position: string }) {
    const listData = await this.bannerService.getPageList<ContentBanner>({ pageNum, pageSize }, (query) => {
      if (position) {
        query.where({
          position
        })
      }
      return query
    })
    return Response.success(listData)
  }

  @Post('')
  public add(@Body() params: Partial<AdminAuthMenu>) {
    if (this.bannerService.create(params)) {
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