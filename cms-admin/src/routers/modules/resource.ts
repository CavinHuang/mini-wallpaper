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
      },
      {
        path: 'tags',
        name: 'resourceTags',
        component: () => import('@/views/resource/tag.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '资源标签管理',
          key: 'resourceTags'
        }
      }
    ]
  }
]

export default homeRouter
