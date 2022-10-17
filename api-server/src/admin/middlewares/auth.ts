/**
 * auth middleware
 */
import { Container } from '@/core/container';
import { httpError } from '@/core/error/http';
import { AppContext } from '@/interface/application';
import adminConfig from '../config.json'

export const AdminAuth = (ctx) => {
  return async function AdminAuthHandler (ctx: AppContext, next) {
    ctx.$.logInfo('权限校验开始', ctx.url)
    if (adminConfig.whiteRouter.includes(ctx.url)) {
      return await next()
    }

    // 判断下有没有校验信息
    if (!ctx.headers['authorization']) {
      throw new httpError.UnauthorizedError();
    }
    // 从 header 上获取校验信息
    const parts = ctx.get('authorization').trim().split(' ');
    if (parts.length !== 2) {
      throw new httpError.UnauthorizedError();
    }

    const [scheme, token] = parts;

    if (/^Bearer$/i.test(scheme)) {
      try {
        //jwt.verify方法验证token是否有效
        const jwtService = Container.get('JwtService')
        await jwtService.verify(token, {
          complete: true,
        });
      } catch (error) {
        //token过期 生成新的token
        console.log('过期')
        const loginService = Container.get('LoginService')
        const newToken = await loginService.updateToken(token);
        //将新token放入Authorization中返回给前端
        ctx.set('Authorization', newToken);
      }
      await next();
    }
  }
}