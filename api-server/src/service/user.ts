import { redisClient, redisGet } from './../core/redis/index';
import { M } from "../models";
import { User } from "../models/entity/user";
import md5 from 'md5'
import { random } from '../utils'
import { Pagination } from '@/core';
import { Response } from '@/core/responce';

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

  /**
   * 获取用户信息
   * @param appid 
   * @param openid 
   * @returns 
   */
  async getUserByOpenId(appid: string, openid: string) {
    const user = M(User)
    const result = await user.findOne({
      where: {
        appid,
        openid: openid ? openid: ''
      }
    })

    return result
  }

  /**
   * 获取用户信息
   * @param uid 
   * @returns 
   */
  async getUserById(uid: number) {
    const user = M(User)
    return user.findOne({
      where: { id: uid }
    })
  }

  /**
   * 获取redis的用户
   * @param token 
   * @returns 
   */
  public async getRedisUser(token: string) {
    const user = await redisGet<User>(token)
    return user
  }

  /**
   * 创建用户token
   * @param openid 
   * @returns 
   */
  public createUserToken(openid: string) {
    return md5(openid + new Date().valueOf()) + random(1, 100000)
  }

  /**
   * 做登录
   * @param appid 
   * @param openid 
   * @returns 
   */
  public async doLogin(appid: string, openid: string) {
    const userRes = await userService.getUserByOpenId(appid, openid)
    const userToken = this.createUserToken(openid)
    if (userRes) {
      redisClient.set(openid, userToken)
      redisClient.set(userToken, JSON.stringify(userRes))
      redisClient.expire(userToken, 60 * 60 * 1)
      redisClient.expire(openid, 60 * 60 * 1)
    }
    return userRes
  }

  /**
   * 获取当前用户的团队成员
   * @param uid 
   */
  public async getMyPartner(uid = 0, offset = 0, limit = 10) {
    if (!uid) return []

    const userQuery = M(User).createQueryBuilder('u').where('status = :status AND id = :uid', { status: 1, uid })

    const res = Pagination.findByPage(userQuery, { offset, limit })

    return Response.success(res, Response.successMessage)
  }
}

export const userService = new UserService