import { ReqPage } from '.'

export namespace Crawel {
  export interface list {
    name: string
    domain: string
    list_url: string
    list_item: string
    list_item_cover: string
    list_item_name: string
    detail_url: string
    play_url: string
    create_at: number
    status: number
    counter_fetch: number
    last_fetch_date: Date
  }

  export interface ReqGetCrawelParams extends ReqPage {
    name: string
  }
}
