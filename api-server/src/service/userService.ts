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
    let pid = params.pid || 0
    if (params.pid) {
      const res = await this.repository.findOne({
        where: {
          id: pid
        }
      })
      if (!res) pid = 0
    }

    const user = this.repository.create({
      username: '',
      pid: pid,
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

    await this.userProfile.save(userProfile)
    user.profile = userProfile

    return await this.repository.save(user)
  }

  public async getUserInfoByOpenId(openId: string) {
    return await this.getInfoByQueryBuilder<User>((query)=>{
      query = query.leftJoinAndSelect("user.profile", "profile").where('profile.openid = :openId', { openId })
      return query
    }, 'user')
  }

  public async updateUserInfo(params: Partial<User & UserProfile & { nickName: string, avatarUrl: string; gender: string }>) {
    console.log("🚀 ~ file: userService.ts ~ line 53 ~ UserService ~ updateUserInfo ~ params", params, params.openid)
    const user = await this.getUserInfoByOpenId(params.openid)
    const profile = {
      ...user.profile,
      nickname: params.nickName || user.profile.nickname,
      avatar: params.avatarUrl || user.profile.avatar,
      gender: params.gender === '' ? 2 : params.gender,
      country: params.country || user.profile.country,
      province: params.province || user.profile.province,
      city: params.city || user.profile.city
    }
    console.log("🚀 ~ file: userService.ts ~ line 58 ~ UserService ~ updateUserInfo ~ params.nickname || user.profile.nickname", params.nickname || user.profile.nickname)

    console.log("🚀 ~ file: userService.ts ~ line 57 ~ UserService ~ updateUserInfo ~ profile", profile)
    const saveData = { ...user, ...params, profile }
    saveData.profile = profile
    console.log("🚀 ~ file: userService.ts ~ line 66 ~ UserService ~ updateUserInfo ~ saveData", saveData)
    return await this.repository.save(saveData)
  }
}