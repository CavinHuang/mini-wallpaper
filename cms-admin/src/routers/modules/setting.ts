import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/routers/constant'

// 设置模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/site',
    children: [
      {
        path: 'site',
        name: 'settingSite',
        component: () => import('@/views/setting/site.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '应用配置',
          key: 'settingSite'
        }
      }
    ]
  }
]

export default homeRouter
