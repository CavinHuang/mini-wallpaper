import { Controller, Get } from "@/core/decorator";
import { Response } from "@/core/responce";

@Controller('/menu')
export class Menu {

  @Get('/list', { skipPerm: true })
  public list() {
    return Response.success([
        { icon: 'home-filled', title: '首页', path: '/home/index' },
        // { icon: 'histogram', title: '数据大屏', path: '/dataScreen' },
        { icon: 'user', title: '用户', path: '/user/index', children: [
          { path: '/user/list', title: '用户列表' },
          { path: '/user/list', title: '用户等级' },
          { path: '/user/list', title: '用户组管理' },
        ] },
        { icon: 'food', title: '应用', path: '/app/index', children: [
          { title: '小程序', path: '/mini-program/list' }
        ] },
        { icon: 'Grid', title: '内容', path: '/resource/index', children: [
          { title: '轮播图管理', path: '/banner/list' },
          { title: '轮播位置管理', path: '/banner/list' },
          { path: '/resource/list', title: '资源列表' },
          { path: '/category/list', title: '资源分类' },
          { path: '/category/list', title: '资源标签' },
          { path: '/resource/list', title: '创作者管理' },
        ] },
        { icon: 'Grid', title: '设置', path: '/setting', children: [
          { path: '/setting/site', title: '应用配置' },
          { path: '/setting/config', title: '系统设置' },
          { path: '/setting/system', title: '管理权限', children: [
            { path: '/setting/system_role', title: '角色管理' },
            { path: '/setting/system_admin', title: '管理员列表' },
            { path: '/setting/system_menus', title: '权限规则' }
          ] },
        ] },
        { icon: 'Grid', title: '维护', path: '/system', children: [
          { path: '/system/config', title: '开发配置', children: [
            { path: '/system/config/develop', title: '配置分类' },
            { path: '/system/config/system_config_tab/:id', title: '配置列表', meta: { hidden: true } },
            { path: '/system/data_group/index', title: '数据字典组' },
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