import { ReqPage } from '.'

export namespace MinProgram {
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
