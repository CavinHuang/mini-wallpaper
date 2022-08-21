import 'reflect-metadata'
import { Container } from '@/core/container/container';
import { isDev, dirController } from '../../config'
import ReaddirRecur from 'fs-readdir-recursive'
import path from 'path'
import {validate} from 'class-validator'
import { ROUTE_PARAMS_SOURCE, TAGS } from '@/core/constants';
import router from '../router';
import { plainToClass } from 'class-transformer';

const appendExt = isDev ? '.api.ts' : '.api.js'

export const initRoute = async (pathAPP) => {
  const filesAPP = ReaddirRecur(pathAPP)
  await filesAPP.filter((file) => file.endsWith(appendExt)).forEach(async(file) => {
    const filePath = path.join(dirController, file)
    const importResult = await import(filePath)
    Object.keys(importResult).forEach(name => {
      const controllerName = name
      const Ctrl = importResult[name]
      const inst = Container.get(controllerName)
      const routePrefixMeta = Reflect.getMetadata(TAGS.ROUTE_PREFIX, Ctrl);
      const routePathMeta = Reflect.getMetadata(TAGS.ROUTE_PATH, Ctrl);
      if (!routePathMeta) return
      routePathMeta.forEach(({ method, path: p, handler }) => {
        // 注册路由
        router[method](path.join(routePrefixMeta, p).replace(/\\/g, '/'), async (ctx) => {
          // 请求参数元信息
          const routeParamsMeta = Reflect.getMetadata(TAGS.ROUTE_PARAMS, Ctrl, handler) || []
          console.log(routeParamsMeta, 'routeParamsMeta')
          // 请求参数类型信息
          const routeParamsTypes = Reflect.getMetadata(TAGS.ROUTE_PARAMS_TYPE, inst, handler)
          const data = await inst[handler](...(await Promise.all(routeParamsMeta.map(
            // 获取参数
            async ({name, type}, index) => {
              let params

              switch(type) {
                case ROUTE_PARAMS_SOURCE.QUERY:
                  params = ctx.query
                  break
                case ROUTE_PARAMS_SOURCE.BODY:
                  params = ctx.request.body
              }
              // 普通对象转为 DTO 的实例对象
              const entity = plainToClass(routeParamsTypes[0], name ? params[name] : params)

              // 校验请求参数
              const errors = await validate(entity)
              if(errors.length) {
                throw new Error(Object.values(errors[0].constraints).join(','))
              }
              return entity
            })
          )));
          ctx.body = data
        })
      })
    })
  })
}