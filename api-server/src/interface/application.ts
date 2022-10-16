import { Server } from '@/server';
import { Context, Request } from 'koa';

export type AppRequest = Request & { body: Record<string, any> }

export type AppContext = Context & { 
  request: AppRequest
  user: any
  $: Server
}