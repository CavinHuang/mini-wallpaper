import 'reflect-metadata'
import Router from 'koa-router'
import ReaddirRecur from 'fs-readdir-recursive'
import path from 'path'
import fs from 'fs'
import { Container } from '@/core/container/container';
import { ROUTE_PARAMS_SOURCE, TAGS } from '@/core/constants';
import { plainToClass } from 'class-transformer';
import { Server } from '../Server';
import { initHTTPMares } from './initMiddleware';
import { appConfig, isDev, dirController, dirSrc, serverConfig } from '@/config';
import { objectArraySortByAtr } from '@/utils'
import { validate } from 'class-validator'
import { httpError } from '@/core/error/http'
import { GuardManager } from '@/core/decorator/guardManager'
import deepmerge from 'deepmerge'

const appendExt = isDev ? '.ts' : '.js'

const defaultController = 'controller'

const combineMerge = (target, source, options) => {
  const destination = target.slice()

  source.forEach((item, index) => {
      if (typeof destination[index] === 'undefined') {
          destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
      } else if (options.isMergeableObject(item)) {
          destination[index] = deepmerge(target[index], item, options)
      } else if (target.indexOf(item) === -1) {
          destination.push(item)
      }
  })
  return destination
}

function initModules() {
  const { modules, controller } = appConfig
  const modulesFiles = {}

  if (modules) {
    modules.forEach(module => {
      const modulePath = path.join(dirSrc, module)
      let moduleController = defaultController
      if (Object.prototype.hasOwnProperty.call(controller, module)) {
        moduleController = controller[module] || 'controller'
      }
      const moduleControllerPath = path.join(modulePath, moduleController)
      if (!Object.prototype.hasOwnProperty.call(modulesFiles, module)) {
        modulesFiles[module] = []
      }
      modulesFiles[module].push(...ReaddirRecur(moduleControllerPath))
    })
  }
  return modulesFiles
}

const commonController = 'appCommonController'

const filterHandler = (modulesFiles: Record<string, string[]>) => {
  Object.keys(modulesFiles).forEach(module => {
    const moduleFiles = modulesFiles[module]
    modulesFiles[module] = moduleFiles.filter(file => file.endsWith(appendExt))
  })
  return modulesFiles
}

function initModuleConfig(module: string) {
  const modulePath = path.join(dirSrc, module)
  const configPath = path.join(modulePath, 'config.json')
  const { controller, moduleConfig } = appConfig

  const currentModuleConfig = Object.prototype.hasOwnProperty.call(moduleConfig, module) ? moduleConfig[module] : {}
  const defaultConfig = {
    "module": module,
    controller: controller[module] || 'controller',
    "routerPrefix": "/" + module,
    middlewares: {
      before: [],
      after: []
    }
  }
  let config = {}
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath).toString())
  }
  if (currentModuleConfig.middlewares) {
    const _middlewares = {}
    for (const positon in currentModuleConfig.middlewares) {
      if (Object.prototype.hasOwnProperty.call(currentModuleConfig.middlewares, positon)) {
        const element = currentModuleConfig.middlewares[positon];
        _middlewares[positon] = element.map(handler => handler())
      }
    }
    config = deepmerge(config, { middlewares: _middlewares }, { arrayMerge: combineMerge })
  }
  return deepmerge( defaultConfig, config, { arrayMerge: combineMerge })
}

async function mountedRouter(app: Server, module: string, filesApp: string[], maresHTTPBefore: any[], maresHTTPAfter: any[]) {
  const moduleConfig = initModuleConfig(module)
  let controllerPath = path.join(dirSrc, module, moduleConfig.controller)
  if (module === commonController) {
    moduleConfig.module = 'AppCommon',
    moduleConfig.routerPrefix = serverConfig.facePrefix
    controllerPath = dirController
  }
  const router = new Router({
    prefix: moduleConfig.routerPrefix
  })
  await filesApp.forEach(async(file) => {
    const filePath = path.join(controllerPath, file)
    const importResult = await import(filePath)
    Object.keys(importResult).forEach(name => {
      const controllerName = name
      // controller
      const Ctrl = importResult[name]
      const inst = Container.get(controllerName)
      const routePrefixMeta = Reflect.getMetadata(TAGS.ROUTE_PREFIX, Ctrl);
      const routePathMeta = Reflect.getMetadata(TAGS.ROUTE_PATH, Ctrl);
      const controllerApiOptions = Reflect.getMetadata(TAGS.API_CONTROLLER_OPTIONS, Ctrl)

      if (!routePathMeta) return
      routePathMeta.forEach(({ method, path: p, handler }) => {
        const methodApiOptions = Reflect.getMetadata(TAGS.API_METHOD_OPTIONS, Ctrl, handler)
        const fullPath = path.join(routePrefixMeta, p).replace(/\\/g, '/')
        router[method](fullPath, async function (ctx, next) {
          ctx.rout = {
            route: fullPath,
            method,
            option: { parseResult: true, ...(controllerApiOptions || {}), ...(methodApiOptions || {}) }
          }
          await next()
        })
        // 注册路由
        const beforeMiddlewares = [...maresHTTPBefore, ...moduleConfig.middlewares.before].filter(item => item)
        router[method](fullPath, ...beforeMiddlewares, async (ctx, next) => {
          // 请求参数元信息
          const routeParamsMeta = Reflect.getMetadata(TAGS.ROUTE_PARAMS, Ctrl, handler) || []
          // 请求参数类型信息
          const routeParamsTypes = Reflect.getMetadata(TAGS.ROUTE_PARAMS_TYPE, inst, handler)

          const sortIndexRouteParams = objectArraySortByAtr(routeParamsMeta, 'index')

          const isPassed = await new GuardManager()
          .runGuard(ctx, Ctrl, method);
          if (!isPassed) {
            throw new httpError.ForbiddenError();
          }
          
          const data = await inst[handler](...(await Promise.all(sortIndexRouteParams.map(
            // 获取参数
            async ({name, type, index}, idx) => {
              let params
              switch(type) {
                case ROUTE_PARAMS_SOURCE.QUERY:
                  params = ctx.query
                  break
                case ROUTE_PARAMS_SOURCE.BODY:
                  params = ctx.request.body
                  break
                case ROUTE_PARAMS_SOURCE.PARAMS:
                  params = ctx.params
                  break
                case ROUTE_PARAMS_SOURCE.ALL_PARAMS:
                  params = { ...ctx.query, ...ctx.request.body, ...ctx.params}
                  break
                case ROUTE_PARAMS_SOURCE.CONTEXT:
                  params = ctx
                  break
                case ROUTE_PARAMS_SOURCE.HEADER:
                  params = ctx.header
                  break
              }
              // 普通对象转为 DTO 的实例对象
              const entity = plainToClass(routeParamsTypes[index], name ? params[name] : params)

              // 校验请求参数
              const errors = await validate(entity)
              if(errors.length) {
                throw new Error(Object.values(errors[0].constraints).join(','))
              }
              return entity
            })
          )));
          ctx.body = data
          await next()
        }, ...[...maresHTTPAfter, ...moduleConfig.middlewares.after])

        app.logWarn(`✔ 加载 ~[HTTP接口]~[${method}]~{${moduleConfig.routerPrefix}${fullPath}}`)
      })
    })
  })
  app.koa.use(router.routes()).use(router.allowedMethods())
}

export const initRoute = async (pathAPP, server: Server) => {
  const modulesFiles = initModules()
  modulesFiles[commonController] = ReaddirRecur(pathAPP)
  const [maresHTTPBefore, maresHTTPAfter] = await initHTTPMares()
  const fianlModuleFiles = filterHandler(modulesFiles)
  
  Object.keys(fianlModuleFiles).forEach(module => {
    mountedRouter(server, module, fianlModuleFiles[module], maresHTTPBefore, maresHTTPAfter)
  })
}

