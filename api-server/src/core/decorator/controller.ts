import 'reflect-metadata'
import { Container } from './../container/container';
import { ControllerParams } from '../../interfaces'
import router from '../../server/router'
import { initHTTPMares } from '../../server/core/initMiddleware'
import { logger } from '../logger'
import { ApiOptions } from './../../controller/interface';
import { Response } from "../../core/responce";
import { TAGS } from '../constants';

/**
 * 控制器装饰
 * @param root 
 * @param apiOptions 
 * @returns 
 */
export function Controller(root: string, apiOptions?: Partial<ApiOptions>) {
  return function (target: new (...args: any[]) => any) {
     // 定义 controller 的路径前缀
    Reflect.defineMetadata(TAGS.ROUTE_PREFIX, root, target)
    Reflect.defineMetadata(TAGS.API_CONTROLLER_OPTIONS, apiOptions, target)
    Container.set(target.name, target)
  }
}