import { resolve } from 'path'

export const isDev = process.env.NODE_ENV !== 'production'
export const isProd = !isDev

export const dirProject = resolve(__dirname, '..', '..')

export const dirLogs = resolve(dirProject, 'logs')
export const dirPublic = resolve(dirProject, 'public')

export const dirSrc = resolve(dirProject, isDev ? 'src' : 'dist')

export const dirConfig = resolve(dirSrc, 'config')
export const dirCore = resolve(dirSrc, 'core')
export const dirController = resolve(dirSrc, 'controller')
