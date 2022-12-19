/**
 * posts Controller
 */
import { Inject } from "@/core/container";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { Posts } from "@/models/entity/posts";
import { PostsService } from "../service/postsService";

@Controller('/posts', { skipPerm: true })
export class PostsController {
  @Inject()
  protected postsService: PostsService

  @Get('')
  public async list(@Query() { pageNum = 1, pageSize = 10 }: { pageSize: number, pageNum: number; }) {
    const listData = await this.postsService.getPageList({ pageNum, pageSize, alias: 'p' }, (query) => {
      query.leftJoinAndSelect('p.categories', 'pc')
      query.leftJoinAndSelect('p.tags', 'pt')
      query.orderBy('p.createAt', 'DESC')
      query.addOrderBy('p.id', 'DESC')
      return query
    })
    return Response.success(listData)
  }

  @Get('/:id')
  public async getInfo(@Params('id') id: number) {
    return Response.success(await this.postsService.getInfoByQueryBuilder<Posts>((query) => {
      query.leftJoinAndSelect('p.categories', 'pc')
      query.leftJoinAndSelect('p.tags', 'pt')
      query.where('p.id=:id', { id })
      return query
    }, 'p'), '查询成功')
  }

  @Post('')
  public async add(@Body() params: Partial<Posts>) {
    if (await this.postsService.savePost(params)) {
      return Response.success(true)
    }
    return Response.error('error')
  }

  @Put('/:id')
  public update(@Params('id') id: number, @Body() params: Partial<Posts>) {
    if (this.postsService.savePost({id, ...params})) {
      return Response.success(true, '更新成功')
    }
    return Response.error('更新失败，请重试')
  }

  @Delete('/:id')
  public delete(@Params('id') id: number) {
    if (this.postsService.delete(id)) {
      return Response.success(true, '删除成功')
    }
    return Response.error('删除失败，请重试')
  }
}