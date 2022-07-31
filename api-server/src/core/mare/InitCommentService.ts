import { CommonService } from '../../service/common';
import Joi from 'joi'
import { Response } from '../responce';

export default function initCommentService() {
  return async function (ctx: any, next: any ) {
    const commonService = new CommonService()
    const headerAppid = ctx.headers.appid
    const queryAppid = ctx.request.query.appid
    const appid = headerAppid || queryAppid
    if (!appid) {
      ctx.status = 403
      return (ctx.body = Response.error('缺少必要的appid header'))
    }
    commonService.initCache(appid)
    await next()
  }
}
