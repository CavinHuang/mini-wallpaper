import { ResPage, Game } from '@/api/interface'
import { ContentTypeEnum } from '@/enums/httpEnum'
import { PORT1 } from '@/api/config/servicePort'

import http from '@/api'

/**
 * @name 爬虫管理模块
 */
// * 获取爬虫列表
export const getGameList = (params: Game.ReqGetCrawelParams) => {
  return http.post<ResPage<Game.list>>('/game/list', params)
}

/**
 * @name 爬虫管理模块
 */
// * 获取游戏分类列表
export const getGameCateList = (params: Game.ReqGetCrawelParams) => {
  return http.post<ResPage<Game.cate>>('/gameCate/list', params)
}

// * 新增用户
export const addGame = (params: { id: string }) => {
  return http.post(PORT1 + '/game/create', params)
}

// * 编辑用户
export const editGame = (params: { id: string }) => {
  return http.post(PORT1 + '/game/update', params)
}

// * 新增分类
export const addGameCate = (params: { id: string }) => {
  return http.post(PORT1 + '/crawel/create', params)
}

// * 编辑分类
export const editGameCate = (params: { id: string }) => {
  return http.post(PORT1 + '/gameCate/update', params)
}

// * 删除用户
export const deleteCrawel = (params: { id: string[] }) => {
  return http.post(PORT1 + '/crawel/delete', params)
}

// * 切换用户状态
export const changeCrawelStatus = (params: { id: string; status: number }) => {
  return http.post(PORT1 + '/crawel/change', params)
}
