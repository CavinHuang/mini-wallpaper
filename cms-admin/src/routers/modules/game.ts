import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/routers/constant'

// 首页模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/game',
    component: Layout,
    redirect: '/game/list',
    children: [
      {
        path: 'list',
        name: 'gamelList',
        component: () => import('@/views/game/list.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '游戏管理',
          key: 'game'
        }
      }
    ]
  },
  {
    path: '/gameCate',
    component: Layout,
    redirect: '/gameCate/list',
    children: [
      {
        path: 'list',
        name: 'gameCateList',
        component: () => import('@/views/gameCate/list.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '游戏分类管理',
          key: 'gameCate'
        }
      }
    ]
  }
]

export default homeRouter
