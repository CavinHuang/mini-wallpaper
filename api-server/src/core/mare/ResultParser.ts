import { CONFIG_REDIS_KEY } from '@/service/common';
import { Response } from '../responce';
import { redisGet } from './../redis/index';
import { BusinessError } from '../error/businessError';
const initMareParseResult = () => {
  return async (ctx, next) => {
    const rout = ctx.rout
    ctx.type = 'json'
    if (rout.option.parseResult) {
      try {
        let body = ctx.body
        if (body instanceof BusinessError) {
          ctx.body = Response.error(body.message, process.env.NODE_ENV === 'development' ? body.stack : null, body.code)
        } else {
          //塞入config
          const headerAppid = ctx.headers.appid
          const queryAppid = ctx.request.query.appid
          const appid = (headerAppid || queryAppid) || ''
          body.config = await redisGet(`${CONFIG_REDIS_KEY}${appid}`)
          ctx.body = body
        }
      } catch (e) {
        ctx.status = 500
        ctx.body = e.message
      }
    }

    await next()
  }
}
export default initMareParseResult
