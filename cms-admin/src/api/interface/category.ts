import { ReqPage } from '.'

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
