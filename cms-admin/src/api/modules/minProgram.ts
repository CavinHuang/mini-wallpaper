import { PORT1 } from '@/api/config/servicePort'
import http from '@/api'

import { MinProgram, ResPage } from '../interface'

/**
 * 小程序api
 */
export class MiniProgramApi {
  // * 获取列表
  public static getList(params: MinProgram.ReqGetParams) {
    return http.get<ResPage<MinProgram.Item>>(PORT1 + '/min-program/list', params)
  }

  // * 编辑
  public static edit(params: { id: string }) {
    return http.post(PORT1 + '/min-program/update', params)
  }

  // * 增加
  public static add(params: { id: string }) {
    return http.post(PORT1 + '/min-program/create', params)
  }

  // * 增加
  public static delete(params: { id: string }) {
    return http.post(PORT1 + '/min-program/delete', params)
  }
}
