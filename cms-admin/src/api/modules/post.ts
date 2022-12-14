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
    likes: number
    favorites: number
    commentCount: number
    tags: Tag.Item[]
    views: number
    categories: Category.Item[]
    showHeader: boolean
    switchComment: boolean
    switchScore: boolean
    requireScore: number
    switchPassword: boolean
    password: string
    directLinkSwitch: boolean
    directLink: string
    switchJili: boolean
    content: string
    badge: string
    createAt: string
  }

  export interface ReqGetParams extends ReqPage {
    name: string
  }
}
const postCurd = crudBuilder<Post.Item>('/admin/posts')

export const PostApi = {
  ...postCurd
}
