import { ReqPage, ResPage } from '../interface'
import { request } from '@/api'

export namespace AuthAdmin {
  export interface adminItem {
    id: string
    username: string
    password: string
    nickname: string
    is_super: boolean
    status: number
    last_action_user: string
    update_at: Date
  }

  export interface ReqGetParams extends ReqPage {
    username: string
    nickname: string
  }
}

const http = request({
  baseURL: '/admin'
})

export class AuthAdminApi {
  /**
   * 获取列表
   * @param params
   * @returns
   */
  public static page(params: AuthAdmin.ReqGetParams) {
    return http.get<ResPage<AuthAdmin.adminItem>>('/admin-user', params)
  }

  /**
   * 获取单个角色的信息
   * @param id
   * @returns
   */
  public static info(id: number) {
    return http.get<AuthAdmin.adminItem>(`/admin-user/${id}`)
  }

  /**
   * 增加角色
   * @param postData
   * @returns
   */
  static add(postData: Partial<AuthAdmin.adminItem>) {
    return http.post('/admin-user', postData)
  }

  /**
   * 更新角色
   * @param id
   * @param postData
   * @returns
   */
  static update(postData: Partial<AuthAdmin.adminItem>) {
    return http.put(`/admin-user/${postData.id}`, postData)
  }

  /**
   * 更新角色
   * @param id
   * @param postData
   * @returns
   */
  static delete(id: number) {
    return http.delete(`/admin-user/${id}`)
  }
}
