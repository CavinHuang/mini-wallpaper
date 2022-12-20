/**
 * tag
 */
import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { Tag } from "@/models/entity/tag";
import { SystemGroupDataService } from "../service/systemGroupData";
import { TagService } from "../service/tag";

const typeDataKey = 'tag_type'

@Controller('/tag', { skipPerm: true })
export class TagController {

  @Inject()
  protected tagService: TagService

  @Inject()
  protected systemGroupDataService: SystemGroupDataService

  @Get('')
  public async list(@Query() { pageNum = 1, pageSize = 10, type }: { pageSize: number, pageNum: number; type?: string }) {
    const listData = await this.tagService.getPageList({ pageNum, pageSize }, (query) => {

      if (type) {
        query.where({
          type
        })
      }
      return query
    })
    return Response.success(listData)
  }

  @Get('/type')
  public async getType() {
    const typeData = await this.systemGroupDataService.getConfigNameValue(typeDataKey)
    return Response.success(typeData, Response.successMessage)
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