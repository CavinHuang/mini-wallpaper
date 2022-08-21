import {Middleware} from 'koa'

export const RequestLog =  ():Middleware => async (ctx, next) => {
  await next()
  // 记录请求和响应日志
  console.log(`
    ======>
    timestamp: ${new Date()}
    request method: ${ctx.method}
    request url: ${ctx.path}
    request query: ${JSON.stringify(ctx.query)}
    request body: ${JSON.stringify(ctx.request.body)}
    <======
    response body: ${JSON.stringify(ctx.body)}
  `)
}