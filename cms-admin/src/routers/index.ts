import router from '@/routers/router'
import NProgress from '@/config/nprogress'
import { HOME_URL } from '@/config/config'
import { AuthStore } from '@/store/modules/auth'
import { GlobalStore } from '@/store'
import { AxiosCanceler } from '@/api/helper/axiosCancel'
import { RouteLocationNormalized } from 'vue-router'

const axiosCanceler = new AxiosCanceler()

function checkRouterPath(to: RouteLocationNormalized, routerList: string[]) {
  let checkResult = routerList.indexOf(to.path) > -1

  if (!checkResult) {
    routerList.forEach((path) => {
      const index = path.indexOf(':')
      if (index > -1) {
        const tmpPath = path.substring(0, index - 1)
        if (to.path.indexOf(tmpPath) > -1) {
          checkResult = true
          return
        }
      }
    })
  }
  return checkResult
}

// * 路由拦截 beforeEach
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // * 在跳转路由之前，清除所有的请求
  axiosCanceler.removeAllPending()

  // * 判断当前路由是否需要访问权限
  if (!to.matched.some((record) => record.meta.requiresAuth)) return next()

  // * 判断是否有Token
  const globalStore = GlobalStore()
  if (!globalStore.token) {
    next({
      path: '/login'
    })
    NProgress.done()
    return
  }

  const authStore = AuthStore()
  // * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
  const dynamicRouter = authStore.dynamicRouter
  // * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
  const staticRouter = [HOME_URL, '/403']
  const routerList = dynamicRouter.concat(staticRouter)

  // * 如果访问的地址没有在路由表中重定向到403页面
  console.log(routerList, to.path, to)
  if (checkRouterPath(to, routerList)) return await next()
  next({
    path: '/403'
  })
})

router.afterEach(() => {
  NProgress.done()
})

export default router
