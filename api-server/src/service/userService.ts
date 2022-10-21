import { Inject, Service } from "@/core/container";
import { Query } from "@/core/decorator";
import { User } from "@/models/entity/user";
import { UserProfile } from "@/models/entity/userProfile";
import { Repository } from "typeorm";
import { BaseService } from "./baseService";

@Service()
export class UserService extends BaseService {
  @Inject('User')
  public repository:Repository<User>

  @Inject('UserProfile')
  public userProfile: Repository<UserProfile>

  /**
   * 且注册
   * @param params 
   * @returns 
   */
  public async doRegister(params: Partial<User & UserProfile>) {
    const user = this.repository.create({
      username: '',
      pid: params.pid || 0,
      status: 1
    })

    const userProfile = this.userProfile.create({
      appid: params.appid,
      openid: params.openid,
      nickname: params.nickname || '',
      avatar: params.avatar || '',
      gender: params.gender || 2,
      country: params.country || '',
      province: params.province || '',
      city: params.city || ''
    })

    user.profile = userProfile

    return await this.repository.save(user)
  }
}