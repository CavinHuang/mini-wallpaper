import { PORT1, PORT2 } from '@/api/config/servicePort'
import http from '@/api'

import { ResPage, Category } from '../interface'

/**
 * api
 */
export class CategoryApi {
  // * 获取列表
  public static getList(params: Category.Item) {
    return http.get<ResPage<Category.Item>>(PORT1 + '/category/lists', params)
  }

  // * 编辑
  public static edit(params: { id: string }) {
    return http.post(PORT1 + '/category/update', params)
  }

  // * 增加
  public static add(params: { id: string }) {
    return http.post(PORT1 + '/category/create', params)
  }

  // * 删除
  public static delete(params: { id: string }) {
    return http.post(PORT1 + '/category/delete', params)
  }
}
