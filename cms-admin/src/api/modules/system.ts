import { PORT1, PORT2 } from '@/api/config/servicePort'
import http from '@/api'

import { MinProgram } from '../interface/minProgram'

/**
 * 小程序api
 */
export class SystemApi {
  // * 获取列表
  public static getList(params: MinProgram.ReqGetParams) {
    return http.get<MinProgram.Item[]>(PORT1 + '/system/config-class', params)
  }

  public static getSelectOptions() {
    return http.get<Array<{ label: string; value: number }>>(PORT1 + '/system/getSelectOptions')
  }

  // * 编辑
  public static edit(params: { id: string }) {
    return http.post(PORT1 + '/system/config-tab/update', params)
  }

  // * 增加
  public static add(params: { id: string }) {
    return http.post(PORT1 + '/system/config-tab/create', params)
  }

  // * 增加
  public static delete(params: { id: string }) {
    return http.post(PORT1 + '/systemdelete', params)
  }
}
