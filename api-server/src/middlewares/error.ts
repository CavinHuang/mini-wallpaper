import { Response } from '@/core/responce'
import {Middleware} from 'koa'

export const koaError = ():Middleware => async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    ctx.body = Response.error(err.message, process.env.NODE_ENV === 'development' ? err.stack : null, err.code)
  }
}