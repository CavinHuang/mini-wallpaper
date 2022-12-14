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
    cover: string
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

export namespace Resource {
  export interface Item {
    id: string
    appid: string
    type: string
    name: string
    info: string
    url: string[]
    tags: Tag.Item[]
    categories: Category.Item[]
    thumb_url: string
    upload_type: string
    price: number
    vip_price: number
    is_hot: number
    is_recommend: number
    sort: number
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

const categoryCurd = crudBuilder<Category.Item>('/admin/category')

export const CategoryApi = {
  ...categoryCurd,
  getType: () => {
    return categoryCurd.http.get<BaseDictOptions[]>('/type')
  }
}

const resourceCurd = crudBuilder<Category.Item>('/admin/resource')

export const ResourceApi = {
  ...resourceCurd
}
