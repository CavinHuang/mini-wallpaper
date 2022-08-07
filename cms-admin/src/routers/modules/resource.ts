import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/routers/constant'

// 资源模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/resource',
    component: Layout,
    redirect: '/resource/list',
    children: [
      {
        path: 'list',
        name: 'resourceList',
        component: () => import('@/views/resource/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '资源管理',
          key: 'resourceList'
        }
      }
    ]
  }
]

export default homeRouter
