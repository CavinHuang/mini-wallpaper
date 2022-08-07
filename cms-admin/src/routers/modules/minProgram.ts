import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/routers/constant'

// 小程序管理模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/mini-program',
    component: Layout,
    redirect: '/mini-program/list',
    children: [
      {
        path: 'list',
        name: 'miniProgramList',
        component: () => import('@/views/mini-program/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '小程序管理',
          key: 'miniProgramList'
        }
      }
    ]
  }
]

export default homeRouter
