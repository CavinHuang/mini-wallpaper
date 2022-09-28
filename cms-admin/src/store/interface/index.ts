import { AuthMenu } from '@/api/modules'
/* themeConfigProp */
export interface ThemeConfigProp {
  primary: string
  isDark: boolean
}

/* GlobalState */
export interface GlobalState {
  token: string
  userInfo: any
  assemblySize: string
  language: string
  themeConfig: ThemeConfigProp
}

/* MenuState */
export interface MenuState {
  isCollapse: boolean
  menuList: AuthMenu.Item[]
}

/* TabsState */
export interface TabsState {
  tabsMenuValue: string
  tabsMenuList: Menu.MenuOptions[]
}

/* AuthState */
export interface AuthState {
  authButtons: {
    [propName: string]: any
  }
  authRouter: string[]
}
