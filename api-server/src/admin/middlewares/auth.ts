/**
 * auth middleware
 */
import { httpError } from '@/core/error/http';
import { AppContext } from '@/interface/application';
import Jwt from 'jsonwebtoken'
import adminConfig from '../config.json'

export const AdminAuth = (ctx) => {
  return async function AdminAuthHandler (ctx: AppContext, next) {
    ctx.$.logInfo('权限校验开始', ctx.url)
    if (adminConfig.whiteRouter.includes(ctx.url)) {
      return await next()
    }
    const headers = ctx.header
    const { authorization } = headers
    if (!authorization) {
      throw new httpError.UnauthorizedError();
    }
    const user = Jwt.decode(authorization)
    if (!user) {
      ctx.body = new httpError.UnauthorizedError();
    }
    ctx.$.logInfo('authoriz user', user)
    ctx.user = user
    await next()
  }
}