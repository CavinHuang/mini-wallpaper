/**
 * Category Controller
 */
import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { Category } from "@/models/entity/catgory";
import { CatgoryService } from "../service/catgoryService";
import { SystemGroupDataService } from "../service/systemGroupData";

const typeDataKey = 'category_type'

@Controller('/category', { skipPerm: true })
export class CategoryController {
  @Inject()
  protected catgoryService: CatgoryService

  
  @Inject()
  protected systemGroupDataService: SystemGroupDataService

  @Get('')
  public async list(@Query() { pageNum = 1, pageSize = 10 }: { pageSize: number, pageNum: number; }) {
    const listData = await this.catgoryService.getPageList({ pageNum, pageSize })
    return Response.success(listData)
  }

  @Get('/type')
  public async getType() {
    const typeData = await this.systemGroupDataService.getConfigNameValue(typeDataKey)
    return Response.success(typeData, Response.successMessage)
  }

  @Post('')
  public add(@Body() params: Partial<Category>) {
    if (this.catgoryService.create(params)) {
      return Response.success(true)
    }
    return Response.error('error')
  }

  @Put('/:id')
  public update(@Params('id') id: number, @Body() params: Partial<Category>) {
    if (this.catgoryService.update(id, params)) {
      return Response.success(true, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  @Delete('/:id')
  public delete(@Params('id') id: number) {
    if (this.catgoryService.delete(id)) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}