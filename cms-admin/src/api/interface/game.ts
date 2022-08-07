import { ReqPage } from '.'

export namespace Game {
  export interface list {
    name: string
    cover: string
    play_url: string
    create_at: number
    sort: number
    mobile: boolean
    views_count: number
  }

  export interface ReqGetCrawelParams extends ReqPage {
    name: string
  }

  export interface cate {
    id: number
    name: string
    slug: string
    icon: string
    image: string
    sort: number
    status: number
  }
}
