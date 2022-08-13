import { PORT1, PORT2 } from '@/api/config/servicePort'
import http from '@/api'

import { ResPage, Resource } from '../interface'

/**
 * api
 */
export class ResourceApi {
  // * 获取列表
  public static getList(params: Resource.Item) {
    return http.get<ResPage<Resource.Item>>(PORT1 + '/resource/lists', params)
  }

  // * 编辑
  public static edit(params: { id: string }) {
    return http.post(PORT1 + '/resource/update', params)
  }

  // * 增加
  public static add(params: { id: string }) {
    return http.post(PORT1 + '/resource/create', params)
  }

  // * 删除
  public static delete(params: { id: string }) {
    return http.post(PORT1 + '/resource/delete', params)
  }
}
