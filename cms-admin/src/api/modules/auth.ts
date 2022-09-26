import { ReqPage, ResPage } from '../interface'
import { request } from '@/api'

export namespace Auth {
  export interface RoleItem {
    id: string
    role_name: string
    role_code: string
    remark: string
    status: number
  }

  export interface ReqGetParams extends ReqPage {
    name: string
  }
}

const http = request({
  baseURL: '/admin'
})

export class AuthApi {
  /**
   * 获取列表
   * @param params
   * @returns
   */
  public static page(params: Auth.ReqGetParams) {
    return http.get<ResPage<Auth.RoleItem>>('/role', params)
  }

  /**
   * 获取单个角色的信息
   * @param id
   * @returns
   */
  public static info(id: number) {
    return http.get<Auth.RoleItem>(`/role/${id}`)
  }

  /**
   * 增加角色
   * @param postData
   * @returns
   */
  static add(postData: Partial<Auth.RoleItem>) {
    return http.post('/role', postData)
  }

  /**
   * 更新角色
   * @param id
   * @param postData
   * @returns
   */
  static update(postData: Partial<Auth.RoleItem>) {
    return http.put(`/role/${postData.id}`, postData)
  }

  /**
   * 更新角色
   * @param id
   * @param postData
   * @returns
   */
  static delete(id: number) {
    return http.delete(`/role/${id}`)
  }
}
