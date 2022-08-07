import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/routers/constant'

// banner模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/list',
    children: [
      {
        path: 'list',
        name: 'bannerList',
        component: () => import('@/views/banner/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '轮播图管理',
          key: 'bannerList'
        }
      }
    ]
  }
]

export default homeRouter
