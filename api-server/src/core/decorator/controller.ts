import { ControllerParams } from '../../interfaces'
import router from '../../server/router'
import { initHTTPMares } from '../../server/core/initMiddleware'
import { logger } from '../logger'
import { ApiOptions } from './../../controller/interface';
import { Response } from "../../core/responce";

/**
 * 控制器装饰
 * @param root 
 * @param apiOptions 
 * @returns 
 */
export function Controller(root: string, apiOptions?: Partial<ApiOptions>) {
  return function (target: new (...args: any[]) => any) {
    const handlerKeys = Object.getOwnPropertyNames(target.prototype).filter(
      key => key !== 'constructor'
    )
    handlerKeys.forEach(async(key) => {
      const path: string = Reflect.getMetadata('path', target.prototype, key)
      const method: string = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      )
      const _apiOptions: Partial<ApiOptions> = Reflect.getMetadata(
        'apiOptions',
        target.prototype,
        key
      )
      const handler = target.prototype[key]
      const middlewares = Reflect.getMetadata('middlewares', target.prototype, key) || [] // 取出中间件
      const [maresHTTPBefore, maresHTTPAfter] = await initHTTPMares()

      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`
        router[method](fullPath, async function (ctx, next) {
          ctx.rout = {
            route: fullPath,
            method,
            option: { parseResult: true, ...(apiOptions || {}), ...(_apiOptions || {}) }
          }
          await next()
        })
        // 前置中间件
        for (const mare of maresHTTPBefore) {
          router[method](fullPath, mare)
        }
        router[method](fullPath, ...middlewares, async (ctx, next) => {
          try {
            const params: ControllerParams = {
              query: ctx.request.query,
              body: ctx.request.body,
              $: ctx.$,
              ...ctx.request.query,
              ...ctx.request.body
            }
          const result = await handler(params)
          ctx.body = result
          } catch (e) {
            // ctx.status = 500
            ctx.body = Response.error(e.message, e.code)
          }
          await next()
        })
        // 后置中间件
        for (const mare of maresHTTPAfter) {
          router[method](fullPath, mare)
        }
        logger.warn(`✔ 加载 ~[HTTP接口]~{${method}}~{${fullPath}}`)
      }
    })
  }
}