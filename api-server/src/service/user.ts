import { redisGet } from './../core/redis/index';
import { Repository } from "typeorm";
import { M } from "../models";
import { User } from "../models/entity/user";

class UserService {

  /**
   * 保存用户信息
   */
  async saveUserInfo(userInfo: Partial<User>) {
    const user = M(User)
    const raw = user.create(userInfo)
    const userSaveRes = await user.save(raw)
    return userSaveRes
  }

  async getUserByOpenId(appid: string, openid: string) {
    const user = M(User)
    const result = await user.findOne({
      where: {
        appid,
        openid
      }
    })

    return result
  }

  async getUserById(uid: number) {
    const user = M(User)
    return user.findOne({
      where: { id: uid }
    })
  }

  public async getRedisUser(token: string) {
    const user = await redisGet<User>(token)
    return user
  }
}

export const userService = new UserService