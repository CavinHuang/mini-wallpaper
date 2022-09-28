import { ReqPage, ResPage } from '../interface'
import { request } from '@/api'

export namespace AuthMenu {
  export interface Item {
    id: number
    pid: number
    menu_name: string
    path: string
    api_url: string
    methods: string
    params: string
    icon: string
    is_link: string
    access: string
    auth_type: number
    unique_auth: number
    no_cache: number
    hidden: boolean
    sort: number
    status: number
    last_action_user: string
    update_at: Date
    children?: Item[]
  }

  export interface ReqGetParams extends ReqPage {
    keyword?: string
    hidden?: string
  }
}

const http = request({
  baseURL: '/admin'
})

export class AuthMenusApi {
  /**
   * 获取列表
   * @param params
   * @returns
   */
  static tree(params?: AuthMenu.ReqGetParams) {
    return http.get<AuthMenu.Item[]>('/menus', params)
  }

  /**
   * 获取单个的信息
   * @param id
   * @returns
   */
  static info(id: number) {
    return http.get<AuthMenu.Item>(`/menus/${id}`)
  }

  /**
   * 增加
   * @param postData
   * @returns
   */
  static add(postData: Partial<AuthMenu.Item>) {
    return http.post('/menus', postData)
  }

  /**
   * 更新
   * @param id
   * @param postData
   * @returns
   */
  static update(postData: Partial<AuthMenu.Item>) {
    return http.put(`/menus/${postData.id}`, postData)
  }

  /**
   * 更新
   * @param id
   * @param postData
   * @returns
   */
  static delete(id: number) {
    return http.delete(`/menus/${id}`)
  }
}
