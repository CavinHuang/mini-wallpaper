import { crudBuilder } from '../apiCreator'
import { ReqPage } from '../interface'
export namespace MiniProgram {
  export interface Item {
    name: string
    appid: string
    appsecret: string
    status: number
  }

  export interface ReqGetParams extends ReqPage {
    name: string
  }
}

/**
 * 小程序api
 */
// export class MiniProgramApi {
//   // * 获取列表
//   public static getList(params: MinProgram.ReqGetParams) {
//     return http.get<ResPage<MinProgram.Item>>(PORT1 + '/min-program/list', params)
//   }

//   // * 编辑
//   public static edit(params: { id: string }) {
//     return http.post(PORT1 + '/min-program/update', params)
//   }

//   // * 增加
//   public static add(params: { id: string }) {
//     return http.post(PORT1 + '/min-program/create', params)
//   }

//   // * 增加
//   public static delete(params: { id: string }) {
//     return http.post(PORT1 + '/min-program/delete', params)
//   }
// }

export const MiniProgramApi = crudBuilder<MiniProgram.Item>('/admin/mini-program')
