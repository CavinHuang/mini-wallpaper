import { redisClient, redisGet } from './../core/redis/index';
import { M } from "../models";
import { User } from "../models/entity/user";
import md5 from 'md5'
import { random } from '../utils'
import { Pagination } from '@/core';
import { Response } from '@/core/responce';
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { BusinessError, BUSINESS_ERROR_CODE } from '@/core/error/businessError';
import { secret } from '@/config';
import { classToPlain } from 'class-transformer';
import { SelectQueryBuilder } from 'typeorm';

class UserService {
  /**
   * 获取分页数据
   * @param type 资源类型
   * @param pageNum 当前页数
   * @param pageSize 总条数
   * @param extralWhere 额外的where条件
   * @returns Promise<Pagination>
   */
  public async getPageUser({ pageNum = 1, pageSize = 10, offset, limit}: { pageNum: number, pageSize: number, offset?: number, limit?: number }, extral?: {
    where: (query: SelectQueryBuilder<User>) => SelectQueryBuilder<User>
  }) {
    let query = M(User).createQueryBuilder('u').where('u.status = :status', { status: 1 })

    if (extral && extral.where) {
      query = extral.where(query)
    }

    query = query.addOrderBy('u.create_at', 'DESC').addOrderBy('u.id', 'DESC')

    const result = await Pagination.findByPage(query, { pageNum, pageSize, offset, limit })

    return result
  }
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
   * 获取用户信息
   * @param uid 
   * @returns 
   */
  async getUserByUserName(username: string) {
    const user = M(User)
    return user.findOne({
      where: { username: username }
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
    return {
      user: { ...userRes, token: userToken },
      token: userToken
    }
  }

  /**
   * jwt 登录
   * @param userName 
   * @param password 
   * @returns 
   */
  public async jwtTokenLogin(userName: string, password: string) {
    const user = await this.getUserByUserName(userName)

    if (!user) throw new BusinessError(BUSINESS_ERROR_CODE.NOT_FOUND, '不存在的用户')

    if (bcrypt.compareSync(password, user.password)) {
      const token = jsonwebtoken.sign({
        data: user,
        // 设置 token 过期时间
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // 60 seconds * 60 minutes = 1 hour
      }, secret)
      return {
        user: classToPlain(user),
        token
      }
    }

    throw new BusinessError(BUSINESS_ERROR_CODE.PASSWORD_ERROR, '密码或者用户名错误')
  }

  /**
   * 创建密码
   * @param pass 
   * @returns 
   */
  public async genUserPassword(pass: string) {
    const slat = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(pass, slat)

    return {
      slat,
      password
    }
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