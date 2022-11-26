import { ReqPage, ResPage } from '../interface'
import { request } from '@/api'

export namespace User {
  export interface Profile {
    nickname: string
    avatar: string
    gender: number
    country: string
    province: string
    city: string
    id: number
    appid: string
    openid: string
  }
  export interface Item {
    id: number
    pid: number
    profile: Profile
    vip_level: number
    score: number
  }
  export interface Creator {
    id: number
    user_id: number
    code: string
    status: number
    remark: number
    user: Item
  }
  export interface ReqGetParams extends ReqPage {
    username?: string
    nickname?: string
  }
}

const http = request({
  baseURL: '/admin'
})

export class UserApi {
  /**
   * 获取列表
   * @param params
   * @returns
   */
  public static page(params: User.ReqGetParams) {
    return http.get<ResPage<User.Item>>('/user', params)
  }

  /**
   * 获取单个角色的信息
   * @param id
   * @returns
   */
  public static info(id: number) {
    return http.get<User.Item>(`/user/${id}`)
  }

  /**
   * 增加角色
   * @param postData
   * @returns
   */
  static add(postData: Partial<User.Item>) {
    return http.post('/user', postData)
  }

  /**
   * 更新角色
   * @param id
   * @param postData
   * @returns
   */
  static update(postData: Partial<User.Item>) {
    return http.put(`/user/${postData.id}`, postData)
  }

  /**
   * 更新角色
   * @param id
   * @param postData
   * @returns
   */
  static delete(id: number) {
    return http.delete(`/user/${id}`)
  }
}
