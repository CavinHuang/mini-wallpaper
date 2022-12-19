import { SelectQueryBuilder } from 'typeorm';
import { BannerService } from "@/admin/service/bannerService";
import { ResourceService } from "@/admin/service/resourceService";
import { TagService } from "@/admin/service/tag";
import { Inject } from "@/core/container";
import { Body, Controller, Get, Header, Params, Post, Query, Req } from "@/core/decorator";
import { Response } from "@/core/responce";
import { Resource } from "@/models/entity/resource";
import { LikeLogService } from '@/service/likeLogService';
import { ResourceOrderService } from '@/service/resourceOrderService';
import { UserCollectionService } from '@/service/userCollectionService';
import { CatgoryService } from '@/admin/service/catgoryService';
import { ResourceLikeLog } from '@/models/entity/resourceLikeLog';
import { User } from '@/models/entity/user';

@Controller('/content', { skipPerm: true })
export class ContentController {

  @Inject()
  private bannerService: BannerService

  @Inject()
  private tagService: TagService

  @Inject()
  private categoryService: CatgoryService

  @Inject()
  private resourceService: ResourceService

  @Inject()
  private likeLogService: LikeLogService

  @Inject()
  private resourceOrderService: ResourceOrderService

  @Inject()
  private userCollectionService: UserCollectionService

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

  @Get('/categories')
  public async cateList
  (
    @Query() { pageNum = 1, pageSize = 1000, type }: { pageSize: number, pageNum: number; type?: string },
    @Header('appid') appid: string
  ) {
    const listData = await this.categoryService.getPageList({ pageNum, pageSize }, (query) => {

      if (type) {
        query.where({
          type,
          appid
        })
      }
      return query
    })
    return Response.success(listData.rows || [], Response.successMessage)
  }

  @Get('/wallpaper')
  public async resourceList(@Query() { tagId = 0, categoryId = 0, isHot = 'false', isRecommend = 'false', search = '', pageNum = 1, pageSize = 15 }: { tagId: number; categoryId: number; isHot: string; isRecommend: string; search: string; pageNum?: number; pageSize?: number }) {
    
    const res = await this.resourceService.getPageList({ pageNum, pageSize, alias: 'r' }, (query: SelectQueryBuilder<Resource>) => {

      const where = {}

      if (isHot === 'true') {
        where['is_hot'] = 1
      }

      if (isRecommend === 'true') {
        where['is_recommend'] = 1
      }
      where['status'] = 2
      query.leftJoinAndSelect('r.tags', 'rt')
      query.leftJoinAndSelect('r.categories', 'rc')
      query.where(where)

      if (search) {
        query.andWhere((qb) => {
          return qb.where('r.name LIKE :name', { name: search })
                   .orWhere('r.info LIKE :info', { info: search })
                   .orWhere('rt.tag_name LIKE :name', { name: search })
                   .orWhere('rc.name LIKE :name', { name: search })
        })
      }

      if (Number(tagId)) {
        query.andWhere(`rt.id=:tagId`, { tagId })
      }
      if (Number(categoryId)) {
        query.andWhere(`rc.id=:categoryId`, { categoryId })
      }

      query.orderBy('r.create_at', 'DESC')
      query.addOrderBy('r.id', 'DESC')

      return query
    })

    return Response.success(res, Response.successMessage)
  }

  @Get('/wallpaper/:id')
  public async resiurce(@Params('id') id: number, @Req('userId') userId: number) {
    const resource = await this.resourceService.getInfoByQueryBuilder<Resource>((query) => {
      query.leftJoinAndSelect('resource.likes','like')
      query.leftJoinAndSelect('like.user','user')
      query.where({ id })
      return query
    }, 'resource')
    let isLike = false
    for (let i = 0; i < resource.likes.length; i++) {
      if (resource.likes[i].user.id === userId) {
        isLike = true
        break
      }
    }
    const collection = await this.userCollectionService.getInfo({
      user: { id: userId }
    })

    let isCollection = false
    if (collection) {
      isCollection = true
    }
    return Response.success({...resource, isLike, isCollection}, Response.successMessage)
  }

  @Post('/wallpaper/like')
  public async resourceLike(@Body() params: { rid: number; userId: number }) {
    return Response.success(await this.likeLogService.saveLike(params))
  }

  @Post('/wallpaper/download')
  public async resourceDownload(@Body() params: { rid: number; userId: number }) {
    return Response.success(await this.resourceOrderService.saveOrder(params), Response.successMessage)
  }

  @Post('/wallpaper/collect')
  public async resourceCollection(@Body() params: { rid: number; userId: number }) {
    return Response.success(await this.userCollectionService.saveCollection(params), Response.successMessage)
  }

  @Get('/wallpaper_latest')
  public async latestWallpaper() {
    const res = await this.resourceService.getInfoByQueryBuilder<Resource>((query) => {
      query.where({
        status: 2
      })
      query.orderBy('create_at', 'DESC')
      return query
    })

    return Response.success(res, Response.successMessage)
  }
}