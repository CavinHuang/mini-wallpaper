const initMareParseResult = ($) => {
  return async (ctx, next) => {
    const rout = ctx.rout

    if (rout.option.parseResult) {
      try {
        const body = ctx.body

        if (body instanceof Error) {
          ctx.body = { code: 400, message: body.message }
        } else {
          ctx.body = body
        }
        ctx.type = 'json'
      } catch {
        ctx.status = 500
      }
    }

    await next()
  }
}
export default initMareParseResult
