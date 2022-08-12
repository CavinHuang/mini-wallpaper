<template>
  <div class="table-box">
    <ProTable ref="proTable" :requestApi="SystemApi.getConfigList" :initParam="initParam" :columns="columns" :pagination="false">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('添加')">配置分类</el-button>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('添加')">添加配置</el-button>
      </template>
      <!-- 用户状态 slot -->
      <template #status="scope">
        <!-- 如果插槽的值为 el-switch，第一次加载会默认触发 switch 的 @change 方法，所有在外层包一个盒子，点击触发盒子 click 方法 -->
        <div @click="changeStatus(scope.row)">
          <el-switch
            :value="scope.row.status"
            :active-text="Boolean(scope.row.status) ? '启用' : '禁用'"
            :active-value="true"
            :inactive-value="false"
          />
        </div>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <Drawer ref="drawerRef"></Drawer>
  </div>
</template>

<script setup lang="tsx" name="useComponent">
import { ref, reactive } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import Drawer from './components/ConfigDrawer.vue'
import { CirclePlus, Delete, EditPen } from '@element-plus/icons-vue'
import { SystemApi } from '@/api/modules'
import { System } from '@/api/interface'
import { useRoute } from 'vue-router'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()
const route = useRoute()

const textType = [
  { value: 'input', label: '文本框' },
  { value: 'dateTime', label: '时间' },
  { value: 'color', label: '颜色' },
  { value: 'number', label: '数字' }
]

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({
  tab_id: route.params.id
})

// 配置项
const columns: Partial<ColumnProps>[] = [
  {
    type: 'index',
    label: '#',
    width: 80
  },
  {
    prop: 'name',
    label: '配置名称'
  },
  {
    prop: 'menu_name',
    label: '字段变量'
  },
  {
    prop: 'input_type',
    label: '字段类型'
  },
  {
    prop: 'value',
    label: '值'
  },
  {
    prop: 'status',
    label: '状态'
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right'
  }
]

// 切换状态
const changeStatus = async (row: System.SystemConfigItem) => {
  await useHandleData(SystemApi.editConfig, { id: row.id, status: Boolean(row.status) ? false : true }, `切换【${row.name}】状态`)
  proTable.value.refresh()
}

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
  acceptParams: (params: any) => void
}
const drawerRef = ref<DrawerExpose>()
const openDrawer = (title: string, rowData: Partial<System.SystemConfigItem> = { type: '0' }) => {
  let params = {
    title: title,
    rowData: { ...rowData },
    isView: title === '查看' ? true : false,
    apiUrl: title === '添加' ? SystemApi.addConfig : title === '编辑' ? SystemApi.editConfig : '',
    getTableList: proTable.value.refresh
  }
  drawerRef.value!.acceptParams(params)
}
</script>
