import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/routers/constant'

// 首页模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/crawel',
    component: Layout,
    redirect: '/crawel/list',
    children: [
      {
        path: 'list',
        name: 'crawelList',
        component: () => import('@/views/crawel/list.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '爬虫管理',
          key: 'crawel'
        }
      }
    ]
  }
]

export default homeRouter
