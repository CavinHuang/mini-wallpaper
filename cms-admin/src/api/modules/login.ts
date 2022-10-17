import { Login } from '@/api/interface/index'
import { PORT1, PORT2 } from '@/api/config/servicePort'

import { request } from '@/api'

const http = request({
  baseURL: '/admin'
})

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<string>('/login', params)
}

// * 获取按钮权限
export const getAuthButtons = () => {
  return http.get<Login.ResAuthButtons>(PORT1 + '/auth/buttons')
}

// * 获取菜单列表
export const getMenuList = () => {
  return http.get<Menu.MenuOptions[]>(PORT1 + '/menu/list')
}
