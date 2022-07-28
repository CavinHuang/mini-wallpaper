import { ApiOptions } from './../../controller/interface';

function genRequestDecorator(type: string) {
  return function (path: string, apiOptions?: Partial<ApiOptions>) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
      Reflect.defineMetadata('apiOptions', apiOptions, target, key)
    }
  }
}

export const Get = genRequestDecorator('get')
export const Post = genRequestDecorator('post')