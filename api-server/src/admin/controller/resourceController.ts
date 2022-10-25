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
    console.log('+++++', pageNum, pageSize)
    const listData = await this.resourceService.getPageList({ pageNum, pageSize, alias: 'r' }, (query) => {
    //    .andWhere(qb => {
    //     const subQuery = qb.subQuery().from('person_group', 'person_group')
    //       .select('person_group.personId')
    //       .where('contact_group.groupId = :groupId')
    //       .getQuery();
    //     return 'person.id in ' + subQuery;
    // })
      // query.andWhere(qb => {
      //   const subQuery = qb.subQuery().from('resource_with_tag', 'rt')
      //                                                               .select('rt.resource_id')
      //                                                               .getQuery()
      //   return `r.id in ${subQuery}`
      // })

      // query.andWhere(qb => {
      //   const subQuery = qb.subQuery().from('resource_with_category', 'rc')
      //                                                               .select('rc.resource_id')
      //                                                               .getQuery()
      //   return `r.id in ${subQuery}`
      // })
      query.leftJoinAndSelect('r.categories', 'rc')
      query.leftJoinAndSelect('r.tags', 'rt')
      query.orderBy('r.create_at', 'DESC')
      query.addOrderBy('r.id', 'DESC')
      return query
    })
    return Response.success(listData)
  }

  @Post('')
  public add(@Body() params: Partial<Resource> & { url: string | Array<string>; }) {
    if (this.resourceService.saveResource(params)) {
      return Response.success(true)
    }
    return Response.error('error')
  }

  @Put('/:id')
  public update(@Params('id') id: number, @Body() params: Partial<Resource> & { url: string | Array<string>; }) {
    if (this.resourceService.saveResource({id, ...params})) {
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