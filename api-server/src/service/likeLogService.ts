import { Inject, Provide } from "@/core/container";
import { BusinessError, BUSINESS_ERROR_CODE } from "@/core/error/businessError";
import { LikeLog } from "@/models/entity/likeLog";
import { Resource } from "@/models/entity/resource";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';

@Provide()
export class LikeLogService extends BaseService {
  @Inject('LikeLog')
  public repository:Repository<LikeLog>

  @Inject('Resource')
  public resource: Repository<Resource>

  public async saveLike(params: { rid: number; userId: number }) {
    const likeLog = await this.repository.findOne({
      where: {
        resources: {
          id: params.rid
        },
        user: {
          id: params.userId
        }
      }
    })

    if (likeLog) throw new BusinessError(BUSINESS_ERROR_CODE.RAW_EXITS, '记录已经存在') 

    const resource = await this.resource.findOne({
      where: {
        id: params.rid
      }
    })

    const saveData = {
      resources: {
        id: params.rid
      },
      user: {
        id: params.userId
      }
    }

    await this.repository.save(saveData)
    // 更新resource表
    await this.resource.save({ ...resource, like_num: Number(resource.like_num) + 1 })
    return saveData
  }
}