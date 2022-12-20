import { defineStore } from 'pinia'
import { TabPaneProps } from 'element-plus'
import { TabsState } from '../interface'
import piniaPersistConfig from '@/config/piniaPersist'
import { HOME_URL, TABS_WHITE_LIST } from '@/config/config'
import router from '@/routers/index'

export const TabsStore = defineStore({
  id: 'TabsState',
  state: (): TabsState => ({
    tabsMenuValue: HOME_URL,
    tabsMenuList: [{ title: '首页', path: HOME_URL, icon: 'home-filled', close: false }]
  }),
  getters: {},
  actions: {
    // Add Tabs
    async addTabs(tabItem: Menu.MenuOptions) {
      // not add tabs black list
      if (TABS_WHITE_LIST.includes(tabItem.path)) return
      const tabInfo: Menu.MenuOptions = {
        title: tabItem.title,
        path: tabItem.path,
        close: tabItem.close,
        ...tabItem
      }
      if (this.tabsMenuList.every((item) => item.path !== tabItem.path)) {
        this.tabsMenuList.push(tabInfo)
      }
      this.setTabsMenuValue(tabItem.fullPath)
      router.push(tabItem)
    },
    // Remove Tabs
    async removeTabs(tabPath: string) {
      console.log('🚀 ~ file: tabs.ts:34 ~ removeTabs ~ tabPath', tabPath)
      let tabsMenuValue = this.tabsMenuValue
      console.log('🚀 ~ file: tabs.ts:36 ~ removeTabs ~ tabsMenuValue', tabsMenuValue)
      const tabsMenuList = this.tabsMenuList
      if (tabsMenuValue === tabPath) {
        console.log('path', '=================')
        tabsMenuList.forEach((item, index) => {
          if (item.fullPath !== tabPath) return
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1]
          console.log('🚀 ~ file: tabs.ts:43 ~ tabsMenuList.forEach ~ nextTab', nextTab)
          if (!nextTab) return
          tabsMenuValue = nextTab.fullPath
          router.push(nextTab)
        })
      }
      this.tabsMenuValue = tabsMenuValue
      this.tabsMenuList = tabsMenuList.filter((item) => item.fullPath !== tabPath)
    },
    // Change Tabs
    async changeTabs(tabItem: TabPaneProps) {
      this.tabsMenuList.forEach((item) => {
        if (item.title === tabItem.label) router.push(item)
      })
    },
    // Set TabsMenuValue
    async setTabsMenuValue(tabsMenuValue: string) {
      this.tabsMenuValue = tabsMenuValue
    },
    // Set TabsMenuList
    async setTabsMenuList(tabsMenuList: Menu.MenuOptions[]) {
      this.tabsMenuList = tabsMenuList
    },
    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue?: string) {
      this.tabsMenuList = this.tabsMenuList.filter((item) => {
        return item.path === tabsMenuValue || item.path === HOME_URL
      })
    },
    // Go Home
    async goHome() {
      router.push(HOME_URL)
      this.tabsMenuValue = HOME_URL
    }
  },
  persist: piniaPersistConfig('TabsState')
})
