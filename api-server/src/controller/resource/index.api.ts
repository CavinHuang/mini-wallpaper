import { CommonService } from './../../service/common';
import { SelectQueryBuilder } from 'typeorm';
import { ResourceWithCategory } from './../../models/entity/resourceWithCategory';
import { Catgory } from './../../models/entity/catgory';
import { ResourceService } from './../../service/resource';
import { ControllerParams } from './../../interfaces/decorator';
import { Controller, Get } from '../../core/decorator'
import { ResourceType } from '../../service/resource';
import { Response } from "../../core/responce";
import { Resource } from '../../models/entity/resource';

interface IListParams {
  limit: number
  offset: number
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
class Test {

  /**
   * 资源列表
   * @param params 
   * @returns 
   */
  @Get('/lists')
  public async list(params: ControllerParams<IListParams>) {
    const { query } = params
    const { limit, offset, type = ResourceType.image, isHot, isRecommend, typeId } = query
    const resourceService = new ResourceService()
    const result = await resourceService.getPageResourceByType(type, { limit, offset }, {
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
  public async infotp(params: ControllerParams<IInfoParams>) {
    const { query } = params
    const { id, appid } = query

    const resource = await (new ResourceService().getResourceById(id)) as Resource & { images: string[] }

    const configs = await CommonService.getRedisConfig(appid)
    const images = resource.url.split(',')
    resource.images = images.map(url => {
      return configs.site.resource_cdn_url[resource.upload_type] + url
    })

    return Response.success(resource, Response.successMessage)
  }
}