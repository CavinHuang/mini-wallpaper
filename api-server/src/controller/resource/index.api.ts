import { ResourceService } from './../../service/resource';
import { ControllerParams } from './../../interfaces/decorator';
import { Controller, Get } from '../../core/decorator'
import { ResourceType } from '../../service/resource';
import { Response } from "../../core/responce";

interface IListParams {
  pageNum: number
  pageSize: number
  type: ResourceType
  isHot?: boolean
  isRecommend?: boolean
}

@Controller('/resource', { skipPerm: true })
class Test {

  /**
   * 资源列表
   * @param params 
   * @returns 
   */
  @Get('/lists')
  public list(params: ControllerParams<IListParams>) {
    const { query } = params
    const { pageNum, pageSize, type = ResourceType.image, isHot, isRecommend } = query
    const resourceService = new ResourceService()
    let where: any = {}
    if (isHot) {
      where.is_hot = true
    }

    if (isRecommend) {
      where.is_recommend = true
    }

    const result = resourceService.getPageResourceByType(type, pageNum, pageSize, where)

    return Response.success(result, Response.successMessage)
  }
}