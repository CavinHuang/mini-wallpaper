import { SelectQueryBuilder } from 'typeorm';
import { BannerService } from "@/admin/service/bannerService";
import { ResourceService } from "@/admin/service/resourceService";
import { TagService } from "@/admin/service/tag";
import { Inject } from "@/core/container";
import { Controller, Get, Params, Query } from "@/core/decorator";
import { Response } from "@/core/responce";
import { Resource } from "@/models/entity/resource";

@Controller('/content', { skipPerm: true })
export class ContentController {

  @Inject()
  private bannerService: BannerService

  @Inject()
  private tagService: TagService

  @Inject()
  private resourceService: ResourceService

  @Get('/banner')
  public async bannerList(@Query() { position = '', pageNum = 1, pageSize = 1000 }: { position?: string; pageNum?: number; pageSize?: number }) {
    const res = await this.bannerService.getPageList({ pageNum, pageSize }, (query) => {
      if (position) query.where({
        position
      })
      return query
    })

    return Response.success(res.rows || [], Response.successMessage)
  }

  @Get('/tags')
  public async tagList(@Query() { pageNum = 1, pageSize = 1000 }: {pageNum?: number; pageSize?: number }) {
    const res = await this.tagService.getPageList({ pageNum, pageSize })

    return Response.success(res.rows || [], Response.successMessage)
  }

  @Get('/wallpaper')
  public async resourceList(@Query() { tagId = 0, categoryId = 0, isHot = false, isRecommend = false, search = '', pageNum = 1, pageSize = 15 }: { tagId: number; categoryId: number; isHot: boolean; isRecommend: boolean; search: string; pageNum?: number; pageSize?: number }) {
    
    const res = await this.resourceService.getPageList({ pageNum, pageSize, alias: 'r' }, (query: SelectQueryBuilder<Resource>) => {
      let tagWhere
      let cateWhere

      if (tagId) tagWhere = `rt.id=${tagId}`
      if (categoryId) cateWhere = `rc.id=${categoryId}`

      const where = {}

      if (isHot) {
        where['is_hot'] = isHot
      }

      if (isRecommend) {
        where['is_recommend'] = isRecommend
      }

      
      query.leftJoinAndSelect('r.tags', 'rt', tagWhere)
      query.leftJoinAndSelect('r.categories', 'rc', cateWhere)
      query.where(where)

      if (search) {
        query.andWhere((qb) => {
          return qb.where('r.name LIKE :name', { name: search })
                   .orWhere('r.info LIKE :info', { info: search })
                   .orWhere('rt.tag_name LIKE :name', { name: search })
                   .orWhere('rc.name LIKE :name', { name: search })
        })
      }

      return query
    })

    return Response.success(res, Response.successMessage)
  }

  @Get('/wallpaper/:id')
  public async resiurce(@Params('id') id: number) {
    return Response.success(await this.resourceService.info(id), Response.successMessage)
  }
}