import { CommonService } from '../../service/common';
import Joi from 'joi'
import { Response } from '../responce';

export default function initCommentService() {
  return async function (ctx: any, next: any ) {
    const commonService = new CommonService()
    const headerAppid = ctx.headers.appid
    const webType = ctx.headers.webtype
    const queryAppid = ctx.request.query.appid
    const appid = headerAppid || queryAppid
    console.log(!appid, ctx.headers, webType, webType !== 'cms-admin')
    if (!appid && webType !== 'cms-admin') {
      ctx.status = 403
      return (ctx.body = Response.error('没有权限'))
    }
    if (appid) {
      commonService.initCache(appid)
    }
    await next()
  }
}
