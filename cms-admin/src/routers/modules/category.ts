import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/routers/constant'

// 资源分类模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/category',
    component: Layout,
    redirect: '/category/list',
    children: [
      {
        path: 'list',
        name: 'categoryList',
        component: () => import('@/views/category/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '资源分类管理',
          key: 'categoryList'
        }
      }
    ]
  }
]

export default homeRouter
