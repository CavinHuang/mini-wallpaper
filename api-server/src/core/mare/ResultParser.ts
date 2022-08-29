import { CONFIG_REDIS_KEY } from '@/service/common';
import { redisGet } from './../redis/index';
const initMareParseResult = () => {
  return async (ctx, next) => {
    const rout = ctx.rout
    console.log("🚀 ~ file: ResultParser.ts ~ line 6 ~ return ~ rout", rout)

    if (rout.option.parseResult) {
      try {
        const body = ctx.body

        if (body instanceof Error) {
          ctx.body = { code: 500, message: body.message }
        } else {
          //塞入config
          const headerAppid = ctx.headers.appid
          const queryAppid = ctx.request.query.appid
          const appid = headerAppid || queryAppid
          body.config = await redisGet(`${CONFIG_REDIS_KEY}${appid}`)
          ctx.body = body
        }
        ctx.type = 'json'
      } catch (e) {
        ctx.status = 500
        ctx.body = e.message
      }
    }

    await next()
  }
}
export default initMareParseResult
