import { CommonService } from '@/service/common';
import { SelectQueryBuilder } from 'typeorm';
import { ResourceWithCategory } from '@/models/entity/resourceWithCategory';
import { Catgory } from '@/models/entity/catgory';
import { ResourceService } from '@/service/resource';
import { ControllerParams } from '@/interfaces/decorator';
import { Body, Controller, Get, Params, Post } from '@/core/decorator'
import { ResourceType } from '@/service/resource';
import { Response } from "@/core/responce";
import { Resource } from '@/models/entity/resource';

interface IListParams {
  limit: number
  offset: number
  pageNum: number
  pageSize: number
  type: ResourceType
  typeId: number
  isHot?: boolean
  isRecommend?: boolean
}

interface IInfoParams {
  id: number
  appid: string
}

@Controller('/resource', { skipPerm: true })
export class ResourceController {

  /**
   * 资源列表
   * @param params 
   * @returns 
   */
  @Get('/lists')
  public async list(@Params() params: IListParams) {
    const { limit, offset, type = ResourceType.image, isHot, isRecommend, typeId, pageNum, pageSize } = params
    const resourceService = new ResourceService()
    const result = await resourceService.getPageResourceByType(type, { limit, offset, pageNum, pageSize }, {
      where: (query: SelectQueryBuilder<Resource>) => {
        if (isHot) {
          query = query.andWhere('r.is_hot = :isHot', { isHot: Boolean(isHot) })
        }

        if (isRecommend) {
          query = query.andWhere('r.is_recommend = :isRecommend', { isRecommend: Boolean(isRecommend) })
        }

        if (typeId) {
          query = query.innerJoin(ResourceWithCategory, 'rwc', 'r.id = rwc.resource_id').leftJoin(Catgory, 'c', 'rwc.category_id = c.id')
          .andWhere('c.id = :typeId', { typeId })
        }

        return query
      }
    }, Boolean(isHot), Boolean(isRecommend))

    return Response.success(result, Response.successMessage)
  }

  /**
   * 获取单个资源
   * @param params 
   * @returns 
   */
  @Get('/infotp')
  public async infotp(@Params() params: IInfoParams) {
    const { id, appid } = params

    const resource = await (new ResourceService().getResourceById(id)) as Resource & { images: string[] }

    const configs = await CommonService.getRedisConfig(appid)
    const images = resource.url.split(',')
    resource.images = images.map(url => {
      return configs.site.resource_cdn_url[resource.upload_type] + url
    })

    return Response.success(resource, Response.successMessage)
  }

  @Post('/create')
  public async create(@Body() raw: Partial<Catgory>) {
    return Response.success(await ResourceService.create(raw), Response.successMessage)
  }

  @Post('/update')
  public async update(@Body() raw: Partial<Catgory>) {
    return Response.success(await ResourceService.update(raw.id, raw), Response.successMessage)
  }
}