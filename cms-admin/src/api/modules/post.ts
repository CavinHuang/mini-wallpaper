import { crudBuilder } from '../apiCreator'
import { ReqPage } from '../interface'
import { Category, Tag } from './content'

export namespace Post {
  export interface Item {
    id: string
    appid: string
    userId: string
    title: string
    excerpt: string
    thumbnail: string[]
    tags: Tag.Item[]
    categories: Category.Item[]
    showHeader: boolean
    switchComment: boolean
    switchScore: boolean
    requireScore: number
    switchPassword: boolean
    password: number
    directLinkSwitch: boolean
    directLink: number
    switchJili: boolean
    content: string
    badge: string
    createAt: string
  }

  export interface ReqGetParams extends ReqPage {
    name: string
  }
}
const postCurd = crudBuilder<Post.Item>('/admin/post')

export const ResourceApi = {
  ...postCurd
}
