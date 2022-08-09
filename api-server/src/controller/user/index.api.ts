import { UserSignInfoService } from './../../service/userSignInfo';
import { classToPlain } from 'class-transformer';
import { Response } from '../../core/responce';
import { ResourceWithCategory } from '../../models/entity/resourceWithCategory';
import { redisGet } from '../../core/redis/index';
import { userService } from '../../service/user';
import { ControllerParams } from "../../interfaces";
import { Controller, Get, Post, Use } from "../../core/decorator";
import { CoreController } from "../CoreController";
import { genValidateParams } from "../../middlewares";
import { loginParams } from "../../validator"
import { Wechat } from "../../service/wechat";
import { redisClient } from '../../core/redis';
import { User } from "../../models/entity/user";
import { Resource } from '../../models/entity/resource';
import { ResourceService, ResourceType } from '../../service/resource';
import { M } from '../../models';
import { BusinessError, BUSINESS_ERROR_CODE } from '@/core/error/businessError';
import { afterOneDay, datesAreOnSameDay } from '@/utils';

interface IGetPhone {
  nickName: string
  gender: 0 | 1 | 2
  avatarUrl: string
  openid: string
  appid: string
  pid: number
}

interface ITougao {
  typeId: number[]
  img: string
  pic: string
  token: string
  appid: string
}

interface ISign {
  is_sign: boolean
  last_sign_date: Date
  sign_max: number
  sign_num: number
  sign_this_max: number
  days: number[]
  n: number
}

/**
 * 用户控制
 */
@Controller('/user')
class UserLogin extends CoreController {

  @Get('/index', { skipPerm: true })
  public async index(params: ControllerParams<{ token: string, uid: number }>) {
    const userRes = await redisClient.get(params.query.token)
    if (userRes) {
      return Response.success({...JSON.parse(userRes), token: params.query.token }, 'success')
    }

    const userRaw = await userService.getUserById(params.query.uid)
    if (userRaw) {
      return Response.success(userRaw, 'success')
    }
  }

  @Use(genValidateParams('get', loginParams))
  @Get('/getOpenid', { skipPerm: true })
  public async getOpenid(params: ControllerParams<{ code: string, appid: string }>) {
    const { query } = params
    const result = await Wechat.code2session(query.appid, query.code)
    const { wechatData } = result
    const { user, token } = await userService.doLogin(query.appid, wechatData.openid)

    if (user) {
      return Response.success({
        userInfo: {...user, token},
        wechatData
      }, '登录成功')
    }
    return Response.success(result, 'success')
  }

  @Get('/getphone', { skipPerm: true })
  public async getphone(params: ControllerParams<IGetPhone>) {
    const { query } = params
    const { appid, openid, nickName, avatarUrl, gender, pid } = query
    const userRes = await userService.getUserByOpenId(appid, openid)

    if (!userRes) {
      // 创建用户
      const saveRes = await userService.saveUserInfo({
        appid,
        openid,
        nickname: nickName,
        avatar: avatarUrl,
        gender,
        pid
      })

      if (saveRes) {
        // 做一次用户登录
        const userRes = await userService.doLogin(appid, openid)
        return Response.success({
          userinfo: userRes
        })
      }
    }

    return Response.success({
      userInfo: userRes
    })
  }

  @Post('/tougao', { skipPerm: true })
  public async tougao(params: ControllerParams<any, ITougao>) {
    const { body } = params
    const { img, pic, typeId, token, appid } = body

    const user = await redisGet<User>(token)

    const rawData: Partial<Resource> = {
      appid,
      type: ResourceType.image,
      name: '投稿作品',
      info: '投稿作品',
      url: pic,
      thumb_url: img,
      upload_type: 'qiniu',
      price: 0,
      vip_price: 0,
      sort: 0,
      is_hot: false,
      is_recommend: false,
      is_deleted: false,
      author: user.id,
      status: 2,
      create_at: new Date()
    }

    try {
      const saveRes = await (new ResourceService).saveResource(rawData)

      if (saveRes) {
        const saveRelation = M(ResourceWithCategory)
        const datas = []
        typeId.forEach(type => {
          datas.push({
            resource_id: saveRes.id,
            category_id: type
          })
        })
        const res = saveRelation.createQueryBuilder().insert().into(ResourceWithCategory).values(datas).execute()
        return Response.success(res, Response.successMessage)
      }

    } catch (e) {
      throw e
    }
  }

  @Get('/tougaojl', { skipPerm: true })
  public async taogaojl(params: ControllerParams<{ limit: number, offset: number, token: string }>) {
    const { query } = params
    const { offset, limit, token } = query
    const user = await userService.getRedisUser(token)
    const resources = await (new ResourceService).getPageResourceByType(ResourceType.image, { offset, limit }, {
      where: (query) => {
        query = query.where('r.status = :status', { status: 2 }).orWhere('r.status = :status', { status: 1 }).orWhere('r.status = :status', { status: 3 })
        if (user.role !== 2) {
          query = query.andWhere('r.author = :author', { author: user.id })
        }
        return query
      }
    })

    return Response.success(resources, Response.successMessage)
  }

  @Get('/tougaodel', { skipPerm: true })
  public async tougaodel(params: ControllerParams<{ id: number, token: string }>) {
    const { query } = params
    const { id, token } = query
    const user = await userService.getRedisUser(token)
    const resource = await (new ResourceService().getResourceById(id))

    if (user.id !== resource.author) {
      return Response.error('只能删除自己的投稿')
    }

    const resourceService = new ResourceService()
    if (resourceService.updateResource(id, { status: 3, is_deleted: true })) {
      return Response.success(true, '删除成功')
    }

    return Response.error('删除失败，请重试~')
  }

  @Get('/tougaoshenhe', { skipPerm: true })
  public async tougaoshenhe(params: ControllerParams<{ id: number, token: string }>) {
    const { query } = params
    const { id, token } = query
    const user = await userService.getRedisUser(token)
    if (user.role !== 2) {
      return Response.error('没有审核权限，请联系管理员！')
    }
    const resourceService = new ResourceService()
    const resource = await (resourceService.getResourceById(id))

    if (!resource) {
      return Response.error('不存在这样的资源！')
    }
    if (resourceService.updateResource(id, { status: 1 })) {
      return Response.success(true, '审核成功')
    }

    return Response.error('审核失败，请重试~')
  }

  @Get('/myteam', { skipPerm: true })
  public async myTeam(params: ControllerParams<{
    offset: number
    limit: number
    uid: number
  }>) {
    const { query } = params
    const { offset, limit, uid } = query

    return userService.getMyPartner(uid, offset, limit)
  }

  /**
   * 签到
   * @param params 
   * @returns 
   */
  @Get('/sign', { skipPerm: true })
  public async sign(params: { uid: number }) {
    const { uid } = params

    const userRes = await userService.getUserById(uid)

    if (!userRes) throw new BusinessError(BUSINESS_ERROR_CODE.NOT_FOUND, '没有这样的用户')

    const lastSign = userRes.last_sign_date

    if (datesAreOnSameDay(new Date(), lastSign)) {
      const { days, n } = await UserSignInfoService.nowSignInfo(userRes.id)
      const result: ISign = {
          is_sign: true,
          sign_max: userRes.sign_max,
          sign_num: userRes.sign_num,
          last_sign_date: userRes.last_sign_date,
          sign_this_max: userRes.sign_this_max,
          days,
          n
        }
      return Response.success(result, '今日已经签过到了')
    }

    const afterDate = afterOneDay(lastSign)
    const now = new Date()
    const sign_max = datesAreOnSameDay(now, afterDate) ? userRes.sign_max + 1 : 0
    const updateData = {
      is_sign: true,
      sign_max,
      sign_num: userRes.sign_num + 1,
      sign_this_max: userRes.sign_this_max + 1,
      last_sign_date: now
    }

    if (userService.saveUserInfo({...userRes, ...updateData, score: userRes.score + 1})) {
      // 记录一条记录
      const { days, n } = await UserSignInfoService.doSign(userRes.id)
      return Response.success({...updateData, days, n}, '签到成功')
    }
    return Response.error('签到失败,请重试~')
  }

  @Get('/getSignInfo', { skipPerm: true })
  public async getSignInfo(params: { uid: number }) {
    const user = classToPlain((await userService.getUserById(params.uid))) as User

    const result: ISign = {
      is_sign: false,
      sign_max: user.sign_max,
      sign_num: user.sign_num,
      last_sign_date: user.last_sign_date,
      sign_this_max: user.sign_this_max,
      days: [],
      n: 0
    }

    if (datesAreOnSameDay(new Date(), user.last_sign_date)) {
      result.is_sign = true
    }

    return Response.success(result, Response.successMessage)
  }

  @Post('/login', { skipPerm: true })
  public async login(params: { username: string, password: string }) {
    const loginRes = await userService.jwtTokenLogin(params.username, params.password)
    return Response.success(loginRes, '登录成功')
  }
}