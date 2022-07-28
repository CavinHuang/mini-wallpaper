import CR from 'crypto'
import { crypto } from '../../config'

const initMareCheckPerm = () => {
  return async (ctx_, next) => {
    const ctx = ctx_
    const raw = ctx.raw

    if (ctx.rout?.option?.skipPerm) {
      return await next()
    }

    const token = raw.token?.trim()

    if (!token) {
      ctx.body = {
        code: 403,
        message: '拒绝访问。缺少登录信息'
      }
      return (ctx.status = 403)
    }

    let ipToken
    let idUserToken

    try {
      const cipher = CR.createDecipheriv('aes-128-cbc',crypto.sign, crypto.iv)
      const info = cipher.update(raw.token, 'hex', 'utf8') + cipher.final('utf8')

      ;[raw.token, ipToken, idUserToken] = info.split('|')
    } catch {
      return (ctx.body = { code: 400, message: '拒绝访问。登录信息无效' })
    }
    if (!raw.token || !idUserToken || !ipToken) {
      return (ctx.body = { code: 400, message: '拒绝访问。缺少登录信息' })
    } else if (raw?._ip != ipToken) {
      return (ctx.body = { code: 400, message: '拒绝访问。登录信息与当前IP不匹配' })
    } else {
      // const token = await (await (await DB).pick()).queryOne('SELECT user_id FROM `t_token` WHERE delete_time IS NULL AND token=$ AND user_id=$', raw.token, idUserToken);

      if (!token) {
        ctx.body = '拒绝访问。登录信息无效'
        return (ctx.status = 403)
      }
    }

    raw._idUser = idUserToken

    await next()
  }
}

export default initMareCheckPerm
