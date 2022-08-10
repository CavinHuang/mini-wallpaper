<template>
  <div class="table-box">
    <ProTable ref="proTable" :requestApi="SystemApi.getList" :initParam="initParam" :columns="columns">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('添加')">添加配置分类</el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope"> {{ scope.row }} </template>
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
import { genderType } from '@/utils/serviceDict'
import { ElMessage } from 'element-plus'
import { User } from '@/api/interface'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import Drawer from '@/views/proTable/components/UserDrawer.vue'
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from '@element-plus/icons-vue'
import { SystemApi } from '@/api/modules'

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
    type: 'selection',
    width: 80,
    fixed: 'left'
  },
  {
    type: 'index',
    label: '#',
    width: 80
  },
  {
    type: 'expand',
    label: 'Expand',
    width: 100
  },
  {
    prop: 'username',
    label: '用户姓名',
    search: true,
    width: 135,
    renderHeader
  },
  {
    prop: 'gender',
    label: '性别',
    width: '140',
    enum: genderType,
    search: true,
    sortable: true,
    searchType: 'select'
  },
  {
    prop: 'idCard',
    label: '身份证号',
    search: true
  },
  {
    prop: 'email',
    label: '邮箱',
    search: true
  },
  {
    prop: 'address',
    label: '居住地址',
    search: true
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 200,
    sortable: true,
    search: true,
    searchType: 'datetimerange',
    initSearchParam: ['2022-04-05 00:00:00', '2022-05-10 23:59:59']
  },
  {
    prop: 'status',
    label: '用户状态',
    sortable: true,
    width: 160
  },
  // {
  // 	prop: "avatar",
  // 	label: "头像",
  // 	width: 120,
  // 	image: true
  // },
  {
    prop: 'operation',
    label: '操作',
    width: 320,
    fixed: 'right',
    renderHeader
  }
]

// 切换状态
const changeStatus = async (row: User.ResUserList) => {
  await useHandleData(changeUserStatus, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.username}】用户状态`)
  proTable.value.refresh()
}

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
  acceptParams: (params: any) => void
}
const drawerRef = ref<DrawerExpose>()
const openDrawer = (title: string, rowData: Partial<User.ResUserList> = {}) => {
  let params = {
    title: title,
    rowData: { ...rowData },
    isView: title === '查看' ? true : false,
    apiUrl: title === '新增' ? addUser : title === '编辑' ? editUser : '',
    getTableList: proTable.value.refresh
  }
  drawerRef.value!.acceptParams(params)
}
</script>
