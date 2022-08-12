import { PORT1, PORT2 } from '@/api/config/servicePort'
import http from '@/api'

import { ResPage, Banner } from '../interface'

/**
 * 小程序api
 */
export class BannerApi {
  // * 获取列表
  public static getList(params: Banner.Item) {
    return http.get<ResPage<Banner.Item>>(PORT1 + '/banner/lists', params)
  }

  // * 编辑
  public static edit(params: { id: string }) {
    return http.post(PORT1 + '/banner/update', params)
  }

  // * 增加
  public static add(params: { id: string }) {
    return http.post(PORT1 + '/banner/create', params)
  }

  // * 增加
  public static delete(params: { id: string }) {
    return http.post(PORT1 + '/banner/delete', params)
  }
}
