import { Login } from '@/api/interface/index'
import { PORT1, PORT2 } from '@/api/config/servicePort'
import http from '@/api'

import { MinProgram } from '../interface/minProgram'

/**
 * 小程序api
 */
export class MiniProgramApi {
  // * 获取列表
  public static getList(params: MinProgram.ReqGetParams) {
    return http.get<MinProgram.Item[]>(PORT1 + '/min-program/list', params)
  }
}
