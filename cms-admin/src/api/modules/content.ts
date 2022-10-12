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

export namespace Tag {
  export interface Item {
    id: number
    appid: string
    type: string
    tag_name: string
    remark: string
    sort: number
    status: number
  }
}

export namespace Category {
  export interface Item {
    id: string
    appid: string
    type: string
    name: string
    short_name: string
    covor: string
    keywords: string
    url: string
    description: string
    weigh: number
    type_text: number
    status: number
    is_deleted: boolean
    create_at: Date
    update_at: Date
  }

  export interface ReqGetParams extends ReqPage {
    name: string
  }
}

const bannerCurd = crudBuilder<Banner.Item>('/admin/banner')

export const BannerApi = {
  ...bannerCurd,
  getPositions: () => {
    return bannerCurd.http.get<any[]>('/position')
  }
}

const tagCurd = crudBuilder<Tag.Item>('/admin/tag')

export const TagApi = {
  ...tagCurd,
  getType: () => {
    return tagCurd.http.get<BaseDictOptions[]>('/type')
  }
}

const categoryCurd = crudBuilder<Tag.Item>('/admin/category')

export const CategoryApi = {
  ...categoryCurd,
  getType: () => {
    return categoryCurd.http.get<BaseDictOptions[]>('/type')
  }
}
