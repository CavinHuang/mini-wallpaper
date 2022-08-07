import { ResPage, Crawel } from '@/api/interface'
import { ContentTypeEnum } from '@/enums/httpEnum'
import { PORT1 } from '@/api/config/servicePort'

import http from '@/api'

/**
 * @name 爬虫管理模块
 */
// * 获取爬虫列表
export const getCrawelList = (params: Crawel.ReqGetCrawelParams) => {
  return http.post<ResPage<Crawel.list>>('/crawel/list', params)
}

// * 新增用户
export const addCrawel = (params: { id: string }) => {
  return http.post(PORT1 + '/crawel/create', params)
}

// * 编辑用户
export const editCrawel = (params: { id: string }) => {
  return http.post(PORT1 + '/crawel/update', params)
}

// * 删除用户
export const deleteCrawel = (params: { id: string[] }) => {
  return http.post(PORT1 + '/crawel/delete', params)
}

// * 切换用户状态
export const changeCrawelStatus = (params: { id: string; status: number }) => {
  return http.post(PORT1 + '/crawel/change', params)
}
