import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/routers/constant'

// dashboard 模块
const dashboardRouter: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/dataVisualize',
    meta: {
      title: 'Dashboard'
    },
    children: [
      {
        path: '/dashboard/dataVisualize',
        name: 'dataVisualize',
        component: () => import('@/views/demo/dashboard/dataVisualize/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '数据可视化',
          key: 'dataVisualize'
        }
      },
      {
        path: '/dashboard/embedded',
        name: 'embedded',
        component: () => import('@/views/demo/dashboard/embedded/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '内嵌页面',
          key: 'embedded'
        }
      }
    ]
  },
  {
    path: '/assembly',
    component: Layout,
    redirect: '/assembly/selectIcon',
    meta: {
      title: '常用组件'
    },
    children: [
      {
        path: '/assembly/selectIcon',
        name: 'selectIcon',
        component: () => import('@/views/demo/assembly/selectIcon/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: 'Icon 选择',
          key: 'selectIcon'
        }
      },
      {
        path: '/assembly/batchImport',
        name: 'batchImport',
        component: () => import('@/views/demo/assembly/batchImport/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '批量导入数据',
          key: 'batchImport'
        }
      }
    ]
  },
  {
    path: '/directives',
    component: Layout,
    redirect: '/directives/copyDirect',
    meta: {
      title: '自定义指令'
    },
    children: [
      {
        path: '/directives/copyDirect',
        name: 'copyDirect',
        component: () => import('@/views/demo/directives/copyDirect/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '复制指令',
          key: 'copyDirect'
        }
      },
      {
        path: '/directives/watermarkDirect',
        name: 'watermarkDirect',
        component: () => import('@/views/demo/directives/watermarkDirect/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '水印指令',
          key: 'watermarkDirect'
        }
      },
      {
        path: '/directives/dragDirect',
        name: 'dragDirect',
        component: () => import('@/views/demo/directives/dragDirect/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '拖拽指令',
          key: 'dragDirect'
        }
      },
      {
        path: '/directives/debounceDirect',
        name: 'debounceDirect',
        component: () => import('@/views/demo/directives/debounceDirect/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '防抖指令',
          key: 'debounceDirect'
        }
      },
      {
        path: '/directives/throttleDirect',
        name: 'throttleDirect',
        component: () => import('@/views/demo/directives/throttleDirect/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '节流指令',
          key: 'throttleDirect'
        }
      },
      {
        path: '/directives/longpressDirect',
        name: 'longpressDirect',
        component: () => import('@/views/demo/directives/longpressDirect/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '长按指令',
          key: 'longpressDirect'
        }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/form/proForm',
    meta: {
      title: '表单 Form'
    },
    children: [
      {
        path: '/form/proForm',
        name: 'proForm',
        component: () => import('@/views/demo/form/proForm/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '超级 Form',
          key: 'proForm'
        }
      },
      {
        path: '/form/basicForm',
        name: 'basicForm',
        component: () => import('@/views/demo/form/basicForm/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '基础 Form',
          key: 'basicForm'
        }
      },
      {
        path: '/form/validateForm',
        name: 'validateForm',
        component: () => import('@/views/demo/form/validateForm/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '校验 Form',
          key: 'validateForm'
        }
      },
      {
        path: '/form/dynamicForm',
        name: 'dynamicForm',
        component: () => import('@/views/demo/form/dynamicForm/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '动态 Form',
          key: 'dynamicForm'
        }
      }
    ]
  },
  {
    path: '/proTable',
    component: Layout,
    redirect: '/proTable/useHooks',
    meta: {
      title: '超级表格'
    },
    children: [
      {
        path: '/proTable/useHooks',
        name: 'useHooks',
        component: () => import('@/views/demo/proTable/useHooks/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '使用 Hooks',
          key: 'useHooks'
        }
      },
      {
        path: '/proTable/useComponent',
        name: 'useComponent',
        component: () => import('@/views/demo/proTable/useComponent/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '使用 Component',
          key: 'useComponent'
        }
      }
    ]
  }
]

export default dashboardRouter
