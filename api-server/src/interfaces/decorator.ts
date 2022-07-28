/**
 * 装饰器相关的interface
 */
import { Server } from '../server/Server';

export interface ControllerParams<Q = Record<string, any>, B = Record<string, any>> {
  query: Q,
  body: B,
  $: Server
}