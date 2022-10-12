/**
 * Resource Controller
 */
import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { Resource } from "@/models/entity/resource";
import { ResourceService } from "../service/resourceService";

@Controller('/resource', { skipPerm: true })
export class ResourceController {
  @Inject()
  protected resourceService: ResourceService

  @Get('')
  public async list(@Query() { pageNum = 1, pageSize = 10 }: { pageSize: number, pageNum: number; }) {
    const listData = await this.resourceService.getPageList({ pageNum, pageSize })
    return Response.success(listData)
  }

  @Post('')
  public add(@Body() params: Partial<Resource>) {
    if (this.resourceService.create(params)) {
      return Response.success(true)
    }
    return Response.error('error')
  }

  @Put('/:id')
  public update(@Params('id') id: number, @Body() params: Partial<Resource>) {
    if (this.resourceService.update(id, params)) {
      return Response.success(true, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  @Delete('/:id')
  public delete(@Params('id') id: number) {
    if (this.resourceService.delete(id)) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}