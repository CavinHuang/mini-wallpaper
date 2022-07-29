import { serverConfig } from './../config/server';
import Router from 'koa-router'

const router = new Router({
  prefix: serverConfig.facePrefix
})

router.allowedMethods()

export default router