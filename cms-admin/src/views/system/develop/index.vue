<template>
  <div class="table-box">
    <ProTable ref="proTable" :requestApi="SystemApi.getList" :initParam="initParam" :columns="columns" :pagination="false">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('添加')">添加配置分类</el-button>
      </template>
      <!-- 用户状态 slot -->
      <template #status="scope">
        <!-- 如果插槽的值为 el-switch，第一次加载会默认触发 switch 的 @change 方法，所有在外层包一个盒子，点击触发盒子 click 方法 -->
        <div @click="changeStatus(scope.row)">
          <el-switch
            :value="scope.row.status"
            :active-text="scope.row.status === 1 ? '启用' : '禁用'"
            :active-value="1"
            :inactive-value="0"
          />
        </div>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">配置列表</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <Drawer ref="drawerRef"></Drawer>
  </div>
</template>

<script setup lang="tsx" name="useComponent">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import Drawer from './components/Drawer.vue'
import { CirclePlus, Delete, EditPen, View } from '@element-plus/icons-vue'
import { SystemApi } from '@/api/modules'
import { System } from '@/api/interface'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({
  type: 1
})

// 自定义渲染头部(使用tsx语法)
const renderHeader = (scope: any) => {
  return (
    <el-button
      type="primary"
      onClick={() => {
        console.log(scope)
        ElMessage.success('我是自定义表头')
      }}
    >
      {scope.row.label}
    </el-button>
  )
}

// 配置项
const columns: Partial<ColumnProps>[] = [
  {
    type: 'index',
    label: '#',
    width: 80
  },
  {
    prop: 'title',
    label: '分类名称'
  },
  {
    prop: 'eng_title',
    label: '分类字段英文'
  },
  {
    prop: 'status',
    label: '状态',
    sortable: true
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right',
    renderHeader
  }
]

// 切换状态
const changeStatus = async (row: System.SystemConfigTabItem) => {
  await useHandleData(SystemApi.edit, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.title}】状态`)
  proTable.value.refresh()
}

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
  acceptParams: (params: any) => void
}
const drawerRef = ref<DrawerExpose>()
const openDrawer = (title: string, rowData: Partial<System.SystemConfigTabItem> = {}) => {
  let params = {
    title: title,
    rowData: { ...rowData },
    isView: title === '查看' ? true : false,
    apiUrl: title === '添加' ? SystemApi.add : title === '编辑' ? SystemApi.edit : '',
    getTableList: proTable.value.refresh
  }
  drawerRef.value!.acceptParams(params)
}
</script>
