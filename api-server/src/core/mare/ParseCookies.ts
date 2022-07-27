import Moment from 'moment'

const initMareParseCookies = ($) => {
  return async (ctx, next) => {
    const cookiesAdd = ctx.body?._cookiesAdd

    if (cookiesAdd) {
      delete ctx.body._cookiesAdd

      for (const key in cookiesAdd) {
        const cookie = cookiesAdd[key]

        if (cookie?.option?.expires) {
          cookie.option.expires = Moment(cookie.option.expires, 'YYYY-MM-DD HH:mm:ss').toDate()
        }

        ctx.cookies.set(key, cookie.value, cookie.option)
      }
    }

    await next()
  }
}
export default initMareParseCookies
