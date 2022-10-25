import { ResourceService } from "@/admin/service/resourceService";
import { Inject, Service } from "@/core/container";
import { ResourceOrder } from "@/models/entity/resourceOrder";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';
import { UserService } from "./userService";
import { User } from '../models/entity/user';
import { BusinessError, BUSINESS_ERROR_CODE } from '../core/error/businessError';

@Service()
export class ResourceOrderService extends BaseService {
  @Inject('ResourceOrder')
  public repository:Repository<ResourceOrder>

  @Inject()
  private resourceService: ResourceService

  @Inject()
  private userService: UserService

  public async saveOrder(params: { userId: number; rid: number }) {
    const orderData = await this.repository.findOne({
      where: {
        user: { id: params.userId },
        resource: { id: params.rid }
      }
    })

    if (orderData) {
      throw new BusinessError(BUSINESS_ERROR_CODE.RAW_EXITS, '已经下载过，免费下载!')
    }
    const resource = await this.resourceService.repository.findOne({
      where: {
        id: params.rid
      }
    })

    const user = await this.userService.info(params.userId) as User

    const originPrice = user.vip_level > 0 ? resource.vip_price : resource.price
    const data = this.repository.create({
      orgin_price: originPrice,
      price: originPrice,
      discount: JSON.stringify([]),
      status: 1
    })

    data.user = user
    data.resource = resource

    const res = await this.resourceService.repository.save({ ...resource, download_num: Number(resource.download_num) + 1 })

    return await this.repository.save(data)
  }
}