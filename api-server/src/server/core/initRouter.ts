import { isDev } from '../../config/path';
import KoaRouter from 'koa-router'
import { join, parse, sep, basename, posix, resolve } from 'path'
import ReaddirRecur from 'fs-readdir-recursive'
import { Server } from '../Server'
import { initHTTPMares } from './initMiddleware'

const appendExt = isDev ? '.api.ts' : '.api.js'

const initRouterHandler = async (server: Server, pathAPP: string) => {
  const router: any = new KoaRouter()
  const methodsRouter = router.methods.map((m) => m.toLowerCase())
  const [maresHTTPBefore, maresHTTPAfter] = await initHTTPMares(server)

  const initRoute = async (pathAPP) => {
    const filesAPP = ReaddirRecur(pathAPP)
    const face = []
    filesAPP
      .filter((file) => file.endsWith(appendExt))
      .forEach((fileAPI) => {
        const infoAPI = parse(fileAPI)
        const pathAPI = join(pathAPP, fileAPI)
        const route = posix.join(...infoAPI.dir.split(sep), basename(infoAPI.base, appendExt))
        face.push({
          route,
          pathAPI
        })
      })

    for (let i = 0; i < face.length; i++) {
      await controllerMounter(face[i].route, face[i].pathAPI)
    }
  }

  // 挂载HTTP接口
  const controllerMounter = async (route, controllerPath) => {
    const controller = (await import(controllerPath)).default
    const controllerInstance = new controller()

    const methodsHTTP = controllerInstance.method
      ? controllerInstance.method
          .split('.')
          .map((m) => m.toLowerCase())
          .filter((m) => methodsRouter.includes(m))
      : ['get']
    for (const method of methodsHTTP) {
      bindControllerWithRouter(method, controllerInstance, route, router)
    }
  }
  const facePrefix = '/api'
  const bindControllerWithRouter = (method: string, controllerInstance, route, router) => {
    const routeFinal = posix.join(facePrefix ?? '/', route)

    router[method](routeFinal, async function (ctx, next) {
      ctx.rout = {
        route,
        method,
        option: { parseResult: true, ...(controllerInstance.apiOptions || {}) }
      }
      await next()
    })

    // 前置中间件
    for (const mare of maresHTTPBefore) {
      router[method](routeFinal, mare)
    }

    // 主处理函数
    router[method](routeFinal, async function (ctx_, next) {
      const ctx = ctx_
      server.logDebug(method + '请求:' + ctx.path + '; 参数：' + JSON.stringify(ctx.raw))
      try {
        const result = await controllerInstance.handle(ctx.raw, ctx, routeFinal, server)
        if (result !== undefined) {
          server.logDebug(method + '请求:' + ctx.path + '; 返回数据：' + JSON.stringify(result))
          ctx.body = result
        }
      } catch (error) {
        ctx.body = error instanceof Error ? error : Error(error)
        server.logError(`执行 ~[HTTP接口]~{${route}}`, ctx.body)
      }
      await next()
    })

    // 后置中间件
    for (const mare of maresHTTPAfter) {
      router[method](routeFinal, mare)
    }

    server.logDebug(`✔ 加载 ~[HTTP接口]~{${method}}~{${route}}`)
  }

  initRoute(pathAPP).then(() => {
    server.koa.use(router.routes())
  })
}

export default initRouterHandler
