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

  protected constructor() {}

  public apiOptions: Partial<ApiOptions> = {
    skipPerm: true,
    parseResult: true
  }

  public setApiOption(option: Partial<ApiOptions>) {
    Object.assign(this.apiOptions, option)
  }

  public abstract handle(raw: any, ctx, routeFinal, $): unknown

  public return(data: any = {}, code = 1, message = '') {
    return {
      data,
      code,
      message
    }
  }

  public success(data, message = '成功', code = 0) {
    return this.return(data, code, message)
  }

  public error(message = '失败', data = null, code = 1) {
    return this.return(data, code, message)
  }
}
