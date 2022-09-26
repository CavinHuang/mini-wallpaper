import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/routers/constant'

// 系统开发配置模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/system',
    component: Layout,
    redirect: '/setting/config',
    children: [
      {
        path: '/system/config/develop',
        name: 'SystemConfigDevelop',
        component: () => import('@/views/system/develop/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '配置分类',
          key: 'SystemConfigDevelop'
        }
      },
      {
        path: '/system/config/system_config_tab/:id',
        name: 'SystemConfigTabList',
        component: () => import('@/views/system/develop/list.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '配置列表',
          key: 'SystemConfigTabList'
        }
      },
      {
        path: '/setting/system_role',
        name: 'SystemRoleTabList',
        component: () => import('@/views/system/auth/role.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '配置列表',
          key: 'SystemConfigTabList'
        }
      }
    ]
  }
]

export default homeRouter
