import { logger } from '@/utils'

const initRequestLog = () => {
  return async (ctx, next) => {
    const path = ctx.url
    const method = ctx.method
    logger.info('[request] ->', method, path)
    await next()
  }
}
export default initRequestLog
