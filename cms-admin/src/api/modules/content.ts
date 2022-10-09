/**
 * 内容模块api管理
 */

import { crudBuilder } from '../apiCreator'
import { ReqPage } from '../interface'

export namespace Banner {
  export interface Item {
    id: string
    appid: string
    position: string
    cover: string
    link: string
    title: string
    background: string
    status: number
    sort: number
    is_deleted: boolean
    create_at: Date
    update_at: Date
  }

  export interface ReqGetParams extends ReqPage {
    name: string
  }
}

const bannerCurd = crudBuilder('/admin/banner')

export const BannerApi = {
  ...bannerCurd,
  getPositions: () => {
    return bannerCurd.http.get<any[]>('/position')
  }
}
