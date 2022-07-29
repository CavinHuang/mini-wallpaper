import Joi from 'joi'

export const loginParams = Joi.object({
  code: Joi.string().alphanum().required(),
  appid: Joi.string().alphanum().required()
})