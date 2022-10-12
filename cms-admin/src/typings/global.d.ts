// * Menu
declare namespace Menu {
  interface MenuOptions {
    path: string
    title: string
    icon?: string
    isLink?: string
    close?: boolean
    hidden?: boolean
    meta?: {
      hidden?: boolean
    }
    children?: MenuOptions[]
  }
}

// * Vite
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_API_URL: string
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_GLOB_APP_TITLE: string
  VITE_DROP_CONSOLE: boolean
  VITE_PROXY_URL: string
  VITE_BUILD_GZIP: boolean
  VITE_REPORT: boolean
}
declare interface AppDataItem {
  title: string
  key: string
  label: string
  value: string
  desc: string
}

declare interface Dict {
  appData: Record<string, AppDataItem>
}

declare interface Options {
  label: string
  value: string
}

declare interface BaseDictOptions {
  title: string
  key: string
  label: string
  desc: string
}
