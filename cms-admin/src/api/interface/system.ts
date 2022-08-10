import { ReqPage } from '.'

export namespace System {
  export interface SystemConfigTabItem {
    id: number
    pid: number
    title: number
    eng_title: number
    status: number
    display: boolean
    icon: string
    type: number
    sort: number
  }

  export interface ReqGetParams extends ReqPage {
    name: string
  }
}
