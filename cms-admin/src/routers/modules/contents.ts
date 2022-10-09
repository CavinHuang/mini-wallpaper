import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/routers/constant'

// 资源分类模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/content/category',
    component: Layout,
    redirect: '/content/category/list',
    children: [
      {
        path: 'list',
        name: 'categoryList',
        component: () => import('@/views/contents/category/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '资源分类管理',
          key: 'categoryList'
        }
      }
    ]
  },
  {
    path: '/content/banner',
    component: Layout,
    redirect: '/content/banner/list',
    children: [
      {
        path: 'list',
        name: 'bannerList',
        component: () => import('@/views/contents/banner/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '轮播图管理',
          key: 'bannerList'
        }
      }
    ]
  },
  {
    path: '/resource',
    component: Layout,
    redirect: '/resource/list',
    children: [
      {
        path: 'list',
        name: 'resourceList',
        component: () => import('@/views/contents/resource/index.vue'),
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
        component: () => import('@/views/contents/resource/tag.vue'),
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
