import { defineStore } from 'pinia'
import { GlobalState, ThemeConfigProp } from './interface'
import { createPinia } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { DEFAULT_PRIMARY } from '@/config/config'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'GlobalState',
  // state: 返回对象的函数
  state: (): GlobalState => ({
    // token
    token: '',
    // userInfo
    userInfo: '',
    // element组件大小
    assemblySize: 'default',
    // language
    language: 'zh',
    // themeConfig
    themeConfig: {
      // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
      layout: 'vertical',
      // 默认 primary 主题颜色
      primary: DEFAULT_PRIMARY,
      // 深色模式
      isDark: false,
      // 灰色模式
      isGrey: false,
      // 色弱模式
      isWeak: false,
      // 面包屑导航
      breadcrumb: true,
      // 标签页
      tabs: true,
      // 页脚
      footer: true
    },
    dicts: {
      appData: {}
    }
  }),
  getters: {
    getAppData(state) {
      return (key: string) => {
        const appData = state.dicts.appData
        console.log('🚀 ~ file: index.ts ~ line 36 ~ return ~ appData', appData)
        if (Object.keys(appData).length) {
          return appData[key]
        }
        return null
      }
    }
  },
  actions: {
    // setToken
    setToken(token: string) {
      this.token = token
    },
    // setUserInfo
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    // setAssemblySizeSize
    setAssemblySizeSize(assemblySize: string) {
      this.assemblySize = assemblySize
    },
    // updateLanguage
    updateLanguage(language: string) {
      this.language = language
    },
    // setThemeConfig
    setThemeConfig(themeConfig: ThemeConfigProp) {
      this.themeConfig = themeConfig
    },
    // set dict
    setDicts(dicts: Dict) {
      this.dicts = dicts
    }
  },
  persist: piniaPersistConfig('GlobalState')
})

// piniaPersist(持久化)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
