import { AuthMenu } from '@/api/modules'
/* themeConfigProp */
export interface ThemeConfigProp {
  layout: string
  primary: string
  isDark: boolean
  isGrey: boolean
  isWeak: boolean
  breadcrumb: boolean
  tabs: boolean
  footer: boolean
}

/* GlobalState */
export interface GlobalState {
  token: string
  userInfo: any
  assemblySize: string
  language: string
  themeConfig: ThemeConfigProp
  dicts: Dict
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
