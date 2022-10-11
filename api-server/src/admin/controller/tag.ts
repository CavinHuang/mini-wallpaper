/**
 * tag
 */
import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { Tag } from "@/models/entity/tag";
import { TagService } from "../service/tag";

@Controller('/tag', { skipPerm: true })
export class TagController {

  @Inject()
  protected tagService: TagService

  @Get('')
  public async list(@Query() { pageNum = 1, pageSize = 10 }: { pageSize: number, pageNum: number; }) {
    const listData = await this.tagService.getPageList({ pageNum, pageSize })
    return Response.success(listData)
  }

  @Post('')
  public add(@Body() params: Partial<Tag>) {
    if (this.tagService.create(params)) {
      return Response.success(true)
    }
    return Response.error('error')
  }

  @Put('/:id')
  public update(@Params('id') id: number, @Body() params: Partial<Tag>) {
    if (this.tagService.update(id, params)) {
      return Response.success(true, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  @Delete('/:id')
  public delete(@Params('id') id: number) {
    if (this.tagService.delete(id)) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}