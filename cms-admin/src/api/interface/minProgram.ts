import { ReqPage } from '.'

export namespace MiniProgram {
  export interface Item {
    name: string
    appid: string
    appsecret: string
    status: number
  }

  export interface ReqGetParams extends ReqPage {
    name: string
  }
}
