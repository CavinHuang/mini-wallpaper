import Koa from 'koa'
import koaBody from 'koa-body'
import KoaStatic from 'koa-static'
import jwt from 'koa-jwt'
import Cors from '@koa/cors'
import Helmet from 'koa-helmet' // 网络安全
import { createServer } from 'http'
import { createSecureServer, Http2ServerRequest, Http2ServerResponse } from 'http2'
import path from 'path'

import { initRoute } from './core/importCtrl'
import { dirController, secret, unlessRoute } from '../config'
import { typeOrmInit } from '../models'
import { RequestLog, koaError } from '@/middlewares'

interface Config {
  name: string
  server: {
    host: string
    port: number
  }
  middleware: {
    before: any[]
    after: any[]
  }
  crypto: {
    sign: string
    iv: string
  }
  // http2: any;
  logger: any
}

export class Server {
  public config: Config
  public http2: ((request: Http2ServerRequest, response: Http2ServerResponse) => void) | undefined
  public server
  public koa: Koa
  logTrace: { (): void; (...params: any[]): any; (...params: any[]): any }
  logDebug: { (): void; (...params: any[]): any; (...params: any[]): any }
  logInfo: { (): void; (...params: any[]): any; (...params: any[]): any }
  logWarn: { (): void; (...params: any[]): any; (...params: any[]): any }
  logError: { (): void; (...params: any[]): any; (...params: any[]): any }
  logMark: { (): void; (...params: any[]): any; (...params: any[]): any }
  logFatal: { (): void; (...params: any[]): any; (...params: any[]): any }

  constructor(serverConfig: Config) {
    if (!serverConfig) throw TypeError('缺少 [服务器配置]{serverConfig}')

    this.config = serverConfig
    this.koa = new Koa()
    this.server = this.http2 ? createSecureServer(this.http2) : createServer(this.koa.callback())

    this.init()
      .then(() => {
        this.start()
      })
      .catch((e) => {
        this.logError('运行错误', e)
      })
  }

  async init() {
    try {
      this.initLogger()
      await typeOrmInit(this.logInfo)
      await initRoute(dirController, this)
      this.initApp()
      await this.initRouter()
    } catch (e) {
      this.logError('运行错误', e)
    }
  }

  /** 服务器协议头 */
  get protocol() {
    return this.http2 ? 'http2' : 'http'
  }

  /** 用于日志记录的服务器名称 */
  get nameLog() {
    return typeof this.config.name == 'string' ? this.config.name : 'Server'
  }

  /** 启动服务器 */
  async start() {
    const {
      config: {
        server: { host, port }
      },
      server,
      logInfo,
      logFatal
    } = this

    try {
      // 监听端口
      server.listen(port, host, () => {
        logInfo(`监听~{${this.protocol}://${host == '0.0.0.0' ? 'localhost' : host}:${port}}`, '✔ ')
      })
    } catch (error) {
      logFatal(`监听~{${this.protocol}://${host}:${port}}`, error)
    }
  }

  /**
   * koa 中间键
   */
  public initApp() {
    const koa = this.koa

    // koa.use(function (ctx, next) {
    //   return next().catch((err) => {
    //     console.log(err)
    //     if (401 == err.status) {
    //       ctx.status = 401
    //       ctx.body = { code: 401, message: '您还没有登录，请先登录！' }
    //     } else if (404 === err.status) {
    //       ctx.status = 404
    //       ctx.body = { code: 404, message: '您访问的路径不存在' }
    //     } else {
    //       throw err
    //     }
    //   })
    // })

    koa.use(async (ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*')
      ctx.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
      )
      ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
      if (ctx.method === 'OPTIONS') {
        ctx.body = 200
      } else {
        await next()
      }
    })

    koa.use(koaBody())

    koa.use(RequestLog())

    koa.use(KoaStatic(path.resolve(__dirname, '../../static')))

    // koa.use(httpProxy())

    // koa.use(
    //   jwt({
    //     secret
    //   }).unless({
    //     path: unlessRoute
    //   })
    // )

    koa.use(Cors())

    // hsts请求头
    // koa.use(
    //   Helmet.contentSecurityPolicy({
    //     // directives: {
    //     //   defaultSrc: ['self', 'unsafe-inline', 'unsafe-eval'],
    //     //   objectSrc: ['none'],
    //     //   scriptSrc: ['self', 'unsafe-inline', 'unsafe-eval'],
    //     //   styleSrc: ['self', 'https:', 'unsafe-inline'],
    //     //   imgSrc: ['self', 'https:', 'data:', 'blob:', 'mediastream:', 'filesystem:'],
    //     //   fontSrc: ['self', 'https:', 'data:', 'blob:', 'mediastream:', 'filesystem:']
    //     // }
    //   })
    // )
    koa.use(Helmet.expectCt())
    koa.use(Helmet.frameguard())
    koa.use(Helmet.hidePoweredBy())
    koa.use(Helmet.hsts())
    koa.use(Helmet.ieNoOpen())
    koa.use(Helmet.noSniff())
    koa.use(Helmet.permittedCrossDomainPolicies())
    koa.use(Helmet.referrerPolicy())
    koa.use(Helmet.xssFilter())
    koa.use(koaError())
  }

  public async initRouter() {
    this.koa.use(async (ctx, next) => {
      ctx.$ = this
      await next()
    })
  }

  /** 加载日志函数 */
  public initLogger() {
    const {
      config: { logger }
    } = this
    // 关闭日志
    if (logger === false) {
      this.logTrace = () => {}
      this.logDebug = () => {}
      this.logInfo = () => {}
      this.logError = () => {}
      this.logWarn = () => {}
      this.logFatal = () => {}
      this.logMark = () => {}
    }
    // 单一日志
    else if (typeof logger == 'function') {
      this.logTrace = (...params) => logger(this.nameLog, ...params)
      this.logDebug = (...params) => logger(this.nameLog, ...params)
      this.logInfo = (...params) => logger(this.nameLog, ...params)
      this.logError = (...params) => logger(this.nameLog, ...params)
      this.logWarn = (...params) => logger(this.nameLog, ...params)
      this.logFatal = (...params) => logger(this.nameLog, ...params)
      this.logMark = (...params) => logger(this.nameLog, ...params)
    }
    // 分级日志
    else {
      const csl = console

      this.logTrace =
        typeof logger?.trace == 'function'
          ? (...params) => logger.trace(this.nameLog, ...params)
          : typeof csl.trace == 'function'
          ? (...params) => csl.trace(this.nameLog, ...params)
          : (...params) => csl.log(this.nameLog, ...params)
      this.logDebug =
        typeof logger?.debug == 'function'
          ? (...params) => logger.debug(this.nameLog, ...params)
          : typeof csl.debug == 'function'
          ? (...params) => csl.debug(this.nameLog, ...params)
          : (...params) => csl.log(this.nameLog, ...params)
      this.logInfo =
        typeof logger?.info == 'function'
          ? (...params) => logger.info(this.nameLog, ...params)
          : typeof csl.info == 'function'
          ? (...params) => csl.info(this.nameLog, ...params)
          : (...params) => csl.log(this.nameLog, ...params)
      this.logError =
        typeof logger?.error == 'function'
          ? (...params) => logger.error(this.nameLog, ...params)
          : typeof csl.error == 'function'
          ? (...params) => csl.error(this.nameLog, ...params)
          : (...params) => csl.log(this.nameLog, ...params)
      this.logWarn =
        typeof logger?.warn == 'function'
          ? (...params) => logger.warn(this.nameLog, ...params)
          : typeof csl.warn == 'function'
          ? (...params) => csl.warn(this.nameLog, ...params)
          : (...params) => csl.log(this.nameLog, ...params)
      this.logFatal =
        typeof logger?.fatal == 'function'
          ? (...params) => logger.fatal(this.nameLog, ...params)
          : typeof csl.error == 'function'
          ? (...params) => csl.error(this.nameLog, ...params)
          : (...params) => csl.log(this.nameLog, ...params)
      this.logMark =
        typeof logger?.mark == 'function'
          ? (...params) => logger.mark(this.nameLog, ...params)
          : typeof csl.info == 'function'
          ? (...params) => csl.info(this.nameLog, ...params)
          : (...params) => csl.log(this.nameLog, ...params)
    }
  }
}
