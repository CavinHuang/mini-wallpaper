import { ResourceService } from "@/admin/service/resourceService";
import { Inject, Service } from "@/core/container";
import { User } from "@/models/entity/user";
import { UserCollection } from "@/models/entity/userCollection";
import { BaseService } from "@/service/baseService";
import { Repository } from 'typeorm';
import { UserService } from "./userService";

@Service()
export class UserCollectionService extends BaseService {
  @Inject('UserCollection')
  public repository:Repository<UserCollection>

  @Inject()
  private resourceService: ResourceService

  @Inject()
  private userService: UserService

  public async saveCollection({ rid, userId, type = 'resource' }: { rid: number; userId: number; type?: string }) {
    const resource = await this.resourceService.repository.findOne({
      where: {
        id: rid
      }
    })

    const user = await this.userService.info(userId) as User

    const data = this.repository.create({
      type
    })

    data.user = user
    // data.resources = resource

    return await this.repository.save(data)
  }
}