import { dirPublic } from './path'
import { resolve } from 'path'
import { crypto } from './crypto'
import { logger } from '../utils'

// import initRoute from './core/initRoute'

import ParseExtra from '../core/mare/ParseExtra'
import CheckPerm from '../core/mare/CheckPerm'
import ParseCookies from '../core/mare/ParseCookies'
import ResultParser from '../core/mare/ResultParser'
import InitComonService from '../core/mare/InitCommentService'
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
