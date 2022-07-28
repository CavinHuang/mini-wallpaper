import Joi from 'joi'

export function genValidateParams(method: string, schema: Joi.Schema) {
  async function validateParams(ctx: any, next: any ) {
    let data: any
    if (method === 'get') {
      data = ctx.request.query
    } else {
      data = ctx.request.body
    }
    const { error } = schema.validate(data)
    if (error) {
      ctx.body = error.message
      return
    }
    await next()
  }
  return validateParams
}
