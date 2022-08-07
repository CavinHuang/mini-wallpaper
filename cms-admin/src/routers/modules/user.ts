import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/routers/constant'

// 用户模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    children: [
      {
        path: 'list',
        name: 'userList',
        component: () => import('@/views/user/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '用户管理',
          key: 'userList'
        }
      }
    ]
  }
]

export default homeRouter
