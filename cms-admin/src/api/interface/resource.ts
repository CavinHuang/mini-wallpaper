import { ReqPage } from '.'

export namespace Resource {
  export interface Item {
    id: string
    appid: string
    type: string
    name: string
    info: string
    url: string
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
