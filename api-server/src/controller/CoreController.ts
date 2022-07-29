import { ApiOptions } from './interface'

/**
 * 核心controller
 */
export abstract class CoreController {
  /**
   * 定义当前controller的路由请求方式
   */
  public method: string = 'get'

  public raw: any
  public ctx: any
  public routeFinal: any
  public $: any
  public upload = false

  public constructor() {}

  public apiOptions: Partial<ApiOptions> = {
    skipPerm: true,
    parseResult: true
  }

  public setApiOption(option: Partial<ApiOptions>) {
    Object.assign(this.apiOptions, option)
  }
}
