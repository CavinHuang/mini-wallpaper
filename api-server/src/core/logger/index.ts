import { serverConfig } from './../../config/server';
import { logger as loggerUtil } from "../../utils"

class Logger {
  /** 用于日志记录的服务器名称 */
  get nameLog() {
    return typeof serverConfig.name == 'string' ? serverConfig.name : 'Server'
  }
  trace (...params: any[]) {
    return loggerUtil.trace(this.nameLog, 'trace', ...params)
  }
  debug (...params: any[]) {
    return loggerUtil.debug(this.nameLog, 'debug', ...params)
  }
  info (...params: any[]) {
    return loggerUtil.info(this.nameLog, 'info', ...params)
  }
  error (...params: any[]) {
    return loggerUtil.error(this.nameLog, 'error', ...params)
  }
  warn (...params: any[]) {
    return loggerUtil.warn(this.nameLog, 'warn', ...params)
  }
  fatal (...params: any[]) {
    return loggerUtil.fatal(this.nameLog, 'fatal', ...params)
  }
  mark (...params: any[]) {
    return loggerUtil.mark(this.nameLog, 'mark', ...params)
  }
}

const logger = new Logger

export {
  logger
}