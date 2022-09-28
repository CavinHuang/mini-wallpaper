import { defineStore } from 'pinia'
import { MenuState } from '../interface'
import piniaPersistConfig from '@/config/piniaPersist'
import { AuthMenu } from '@/api/modules'

// MenuStore
export const MenuStore = defineStore({
  id: 'MenuState',
  state: (): MenuState => ({
    // menu collapse
    isCollapse: false,
    // menu List
    menuList: []
  }),
  getters: {},
  actions: {
    async setCollapse() {
      this.isCollapse = !this.isCollapse
    },
    async setMenuList(menuList: AuthMenu.Item[]) {
      this.menuList = menuList
    }
  },
  persist: piniaPersistConfig('MenuState')
})
