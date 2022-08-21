import { dirPublic } from './path'
import { resolve } from 'path'
import { crypto } from './crypto'
import { logger } from '../utils'
import { ParseExtra, CheckPerm, ParseCookies, ResultParser, InitComonService } from '@/core/mare'
import parseRaw from '../server/mare/parseRaw'

// const { faces, folds } = initRoute(dirController)

export const server = {
  host: '0.0.0.0',
  port: 10089
}

export const name = 'GameApi'

export const facePrefix = '/api'

// 文件保存路径
export const path = {
  arch: 'E://Archive'
}

export const wock = {
  disable: false,
  route: 'wock',
  ping: false
}

export const serverConfig = {
  favicon: resolve(dirPublic, 'favicon.ico'),
  middleware: {
    before: [parseRaw, InitComonService, ParseExtra, CheckPerm],
    after: [ParseCookies, ResultParser]
  },
  name,
  server,
  path,
  facePrefix,
  wock,
  crypto,
  // faces, folds,
  logger
}
