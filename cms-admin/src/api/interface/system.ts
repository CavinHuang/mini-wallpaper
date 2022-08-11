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
    type: string
    sort: number
    children?: SystemConfigTabItem[]
  }

  export interface SystemConfigItem {
    id: number
    menu_name: string
    type: string
    input_type: string
    config_tab_id: number
    parameter: string
    upload_type: number
    required: string
    width: number
    height: number
    value: string
    name: string
    desc: string
    sort: number
    status: boolean
  }

  export interface ReqGetParams extends ReqPage {
    name: string
  }
}
