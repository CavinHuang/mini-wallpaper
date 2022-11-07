import { Resource } from '@/models/entity/resource';
import { Inject, Service } from "@/core/container";
import { User } from "@/models/entity/user";
import { UserContribution } from "@/models/entity/userContribution";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';
import { UserContributionDto } from '@/api/dto/userContribution';

@Service()
export class UserContributionService extends BaseService {
  @Inject('UserContribution')
  public repository:Repository<UserContribution>

  @Inject('User')
  public userRepository: Repository<User>

  @Inject('Resource')
  public resourceRepository: Repository<Resource>

  public saveContribution(params: UserContributionDto & { info?: string, id?: number }) {
    const user = this.userRepository.create({
      id: params.user_id
    })

    const thembUrl = params.resource[0]
    const resource = this.resourceRepository.create({
      type: 'image',
      name: params.title,
      info: params.info || '',
      url: params.resource,
      thumb_url: thembUrl,
      upload_type: 'qiniu',
      price: 0,
      vip_price: 0,
      status: 1,
      author: params.user_id
    })
    const saveData = this.repository.create({
      user,
      resources: resource,
      id: params.id || null
    })
    return this.repository.save(saveData)
  }
}