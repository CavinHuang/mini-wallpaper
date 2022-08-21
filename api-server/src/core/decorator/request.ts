import 'reflect-metadata'
import { TAGS } from '../constants';
import { ApiOptions } from '@/controller/interface';

function genRequestDecorator(method: string) {
  return function (path: string, apiOptions?: Partial<ApiOptions>) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', method, target, key)
      Reflect.defineMetadata('apiOptions', apiOptions, target, key)

      // 定义路由信息 
      const metadata = Reflect.getMetadata(TAGS.ROUTE_PATH, target.constructor) || []
      metadata.push({
        method,
        path,
        handler: key
      })
      // console.log(target.constructor, metadata, '++++++')
      Reflect.defineMetadata(TAGS.ROUTE_PATH, metadata, target.constructor)
    }
  }
}

export const Get = genRequestDecorator('get')
export const Post = genRequestDecorator('post')