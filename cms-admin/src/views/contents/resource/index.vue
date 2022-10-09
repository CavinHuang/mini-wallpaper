<template>
  <div class="table-box">
    <ProTable ref="proTable" :requestApi="ResourceApi.getList" :initParam="initParam" :columns="columns">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
      </template>
      <!-- Expand -->
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
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row, true)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row, true)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef"></UserDrawer>
  </div>
</template>

<script setup lang="tsx" name="adminList">
import { ref, reactive, h } from 'vue'
import { User } from '@/api/interface'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import { useDownload } from '@/hooks/useDownload'
import ProTable from '@/components/ProTable/index.vue'
import ImportExcel from '@/components/ImportExcel/index.vue'
import UserDrawer from './components/UserDrawer.vue'
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from '@element-plus/icons-vue'
import { ResourceApi } from '@/api/modules'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({})

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
    prop: 'appid',
    label: '所属小程序',
    search: true,
    width: 135
  },
  {
    prop: 'name',
    label: '名称',
    width: '140',
    search: true
  },
  {
    prop: 'info',
    label: '说明'
  },
  {
    prop: 'url',
    label: '链接'
  },
  {
    prop: 'upload_type',
    label: '上传类型'
  },
  {
    prop: 'price',
    label: '价格'
  },
  {
    prop: 'vip_price',
    label: '会员价格'
  },
  {
    prop: 'is_hot',
    label: '是否热门'
  },
  {
    prop: 'is_recommend',
    label: '是否推荐'
  },
  {
    prop: 'sort',
    label: '排序'
  },
  {
    prop: 'create_at',
    label: '创建时间',
    width: 200,
    sortable: true
  },
  {
    prop: 'status',
    label: '状态',
    sortable: true,
    width: 160
  },
  {
    prop: 'operation',
    label: '操作',
    width: 320,
    fixed: 'right'
  }
]

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
  await useHandleData(ResourceApi.delete, { id: [params.id] }, `删除【${params.username}】用户`)
  proTable.value.refresh()
}

const data = reactive({
  id: -1,
  password: '',
  confirm_password: ''
})

// 切换用户状态
const changeStatus = async (row: User.ResUserList) => {
  await useHandleData(changeUserStatus, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.username}】用户状态`)
  proTable.value.refresh()
}

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
  acceptParams: (params: any) => void
}
const drawerRef = ref<DrawerExpose>()
const openDrawer = (title: string, rowData: Partial<User.ResUserList> = {}, isEdit: boolean = false) => {
  let params = {
    title: title,
    rowData: { ...rowData },
    isEdit,
    isView: title === '查看' ? true : false,
    apiUrl: title === '新增' ? ResourceApi.add : title === '编辑' ? ResourceApi.edit : '',
    getTableList: proTable.value.refresh
  }
  drawerRef.value!.acceptParams(params)
}
</script>
