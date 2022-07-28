import Joi from 'joi'
import { genValidateParams } from '../../middlewares'

export function validate(schema: Joi.Schema) {
  return function (target: any, key: string) {
    const method = Reflect.getMetadata('method', target, key)
    const validateParamsMiddleware = genValidateParams(method, schema)

    const middlewares = Reflect.getMetadata('middlewares', target, key) || []
    middlewares.push(validateParamsMiddleware)
    Reflect.defineMetadata('middlewares', middlewares, target, key)
  }
}