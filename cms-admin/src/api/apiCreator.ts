import { request } from '.'
import { ReqPage, ResPage } from './interface'

export type ReqGetParams<T = unknown> = T & ReqPage
export type ResHasPage<T = unknown> = ResPage<T>

export function crudBuilder<T = unknown>(baseRoute: string) {
  const http = request({
    baseURL: baseRoute
  })

  /**
   * 获取列表
   * @param params
   * @returns
   */
  function page<P>(params: ReqGetParams<T & P>) {
    return http.get<ResHasPage<T>>('', params)
  }

  /**
   * 获取单个的信息
   * @param id
   * @returns
   */
  function info(id: number) {
    return http.get<T>(`/${id}`)
  }

  /**
   * 增加
   * @param postData
   * @returns
   */
  function add(postData: Partial<T>) {
    return http.post<T>('', postData)
  }

  /**
   * 更新
   * @param id
   * @param postData
   * @returns
   */
  function update(postData: Partial<T & { id: number }>) {
    return http.put<T>(`/${postData.id}`, postData)
  }

  /**
   * 更新
   * @param id
   * @param postData
   * @returns
   */
  function remove(id: number) {
    return http.delete<boolean>(`/${id}`)
  }

  return {
    http,
    page,
    info,
    add,
    update,
    remove
  }
}
