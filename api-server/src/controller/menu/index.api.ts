import { Controller, Get } from "@/core/decorator";
import { Response } from "@/core/responce";

@Controller('/menu')
class Menu {

  @Get('/list', { skipPerm: true })
  public list() {
    return Response.success([
        { icon: 'home-filled', title: '首页', path: '/home/index' },
        // { icon: 'histogram', title: '数据大屏', path: '/dataScreen' },
        { icon: 'user', title: '用户管理', path: '/user/list' },
        { icon: 'food', title: '小程序管理', path: '/mini-program/list' },
        { icon: 'ship', title: '轮播图管理', path: '/banner/list' },
        { icon: 'Grid', title: '资源分类管理', path: '/category/list' },
        { icon: 'Grid', title: '资源管理', path: '/resource/list' },
        // { icon: 'Grid', title: '设置', path: '/setting', children: [
        //   { path: '/setting/site', title: '应用配置', icon: 'menu' },
        // ] },
        { icon: 'Grid', title: '维护', path: '/system', children: [
          { path: '/system/config', title: '开发配置', children: [
            { path: '/system/config/develop', title: '配置分类' },
            { path: '/system/config/system_config_tab/:id', title: '配置列表', meta: { hidden: true } },
          ] },
        ] },

        // {
        //   icon: 'message-box',
        //   title: '超级表格',
        //   path: '/proTable',
        //   children: [
        //     { path: '/proTable/useHooks', title: '使用 Hooks', icon: 'menu' },
        //     { path: '/proTable/useComponent', title: '使用 Component', icon: 'menu' }
        //   ]
        // },
        // {
        //   icon: 'data-analysis',
        //   title: 'Dashboard',
        //   path: '/dashboard',
        //   children: [
        //     { path: '/dashboard/dataVisualize', title: '数据可视化', icon: 'menu' },
        //     { path: '/dashboard/embedded', title: '内嵌页面', icon: 'menu' }
        //   ]
        // },
        // {
        //   icon: 'tickets',
        //   title: '表单 Form',
        //   path: '/form',
        //   children: [
        //     { path: '/form/basicForm', title: '基础 Form', icon: 'menu' },
        //     { path: '/form/validateForm', title: '校验 Form', icon: 'menu' },
        //     { path: '/form/dynamicForm', title: '动态 Form', icon: 'menu' }
        //   ]
        // },
        // {
        //   icon: 'trend-charts',
        //   title: 'Echarts',
        //   path: '/echarts',
        //   children: [
        //     { path: '/echarts/waterChart', title: '水型图', icon: 'menu' },
        //     { path: '/echarts/columnChart', title: '柱状图', icon: 'menu' },
        //     { path: '/echarts/lineChart', title: '折线图', icon: 'menu' },
        //     { path: '/echarts/pieChart', title: '饼图', icon: 'menu' },
        //     { path: '/echarts/radarChart', title: '雷达图', icon: 'menu' },
        //     { path: '/echarts/nestedChart', title: '嵌套环形图', icon: 'menu' }
        //   ]
        // },
        // {
        //   icon: 'briefcase',
        //   title: '常用组件',
        //   path: '/assembly',
        //   children: [
        //     { path: '/assembly/selectIcon', title: 'Icon 选择', icon: 'menu' },
        //     { path: '/assembly/batchImport', title: '批量导入数据', icon: 'menu' }
        //   ]
        // },
        // {
        //   icon: 'stamp',
        //   title: '自定义指令',
        //   path: '/directives',
        //   children: [
        //     { path: '/directives/copyDirect', title: '复制指令', icon: 'menu' },
        //     { path: '/directives/watermarkDirect', title: '水印指令', icon: 'menu' },
        //     { path: '/directives/dragDirect', title: '拖拽指令', icon: 'menu' },
        //     { path: '/directives/debounceDirect', title: '防抖指令', icon: 'menu' },
        //     { path: '/directives/throttleDirect', title: '节流指令', icon: 'menu' },
        //     { path: '/directives/longpressDirect', title: '长按指令', icon: 'menu' }
        //   ]
        // },
        // {
        //   icon: 'list',
        //   title: '菜单嵌套',
        //   path: '/menu',
        //   children: [
        //     { path: '/menu/menu1', title: '菜单1', icon: 'menu' },
        //     {
        //       path: '/menu/menu2',
        //       title: '菜单2',
        //       icon: 'menu',
        //       children: [
        //         { path: '/menu/menu2/menu21', title: '菜单2-1', icon: 'menu' },
        //         {
        //           path: '/menu/menu2/menu22',
        //           title: '菜单2-2',
        //           icon: 'menu',
        //           children: [
        //             { path: '/menu/menu2/menu22/menu221', title: '菜单2-2-1', icon: 'menu' },
        //             { path: '/menu/menu2/menu22/menu222', title: '菜单2-2-2', icon: 'menu' }
        //           ]
        //         },
        //         { path: '/menu/menu2/menu23', title: '菜单2-3', icon: 'menu' }
        //       ]
        //     },
        //     { path: '/menu/menu3', title: '菜单3', icon: 'menu' }
        //   ]
        // },
        // {
        //   icon: 'warning-filled',
        //   title: '错误页面',
        //   path: '/error',
        //   children: [
        //     { path: '/404', title: '404页面', icon: 'menu' },
        //     { path: '/403', title: '403页面', icon: 'menu' },
        //     { path: '/500', title: '500页面', icon: 'menu' }
        //   ]
        // }
      ], Response.successMessage)
  }
}