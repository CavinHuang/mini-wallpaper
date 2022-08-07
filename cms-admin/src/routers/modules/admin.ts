import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/routers/constant'

// 首页模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/list',
    children: [
      {
        path: 'list',
        name: 'homeList',
        component: () => import('@/views/admin/list.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '会员管理',
          key: 'user'
        }
      }
    ]
  }
]

export default homeRouter
