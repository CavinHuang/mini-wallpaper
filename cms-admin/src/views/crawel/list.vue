<template>
  <div class="table-box">
    <ProTable ref="proTable" :requestApi="getCrawelList" :initParam="initParam" :columns="columns">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增规则</el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope"> {{ scope.row }} </template>
      <!-- 爬虫规则状态 slot -->
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
import ProTable from '@/components/ProTable/index.vue'
import UserDrawer from './components/UserDrawer.vue'
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from '@element-plus/icons-vue'
import { getCrawelList, addCrawel, editCrawel, deleteCrawel, changeCrawelStatus } from '@/api/modules/crawel'

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
    prop: 'name',
    label: '规则名称',
    search: true,
    width: 135
  },
  {
    prop: 'domain',
    label: '主站地址',
    width: '140'
  },
  {
    prop: 'list_url',
    label: '列表url',
    width: 200
  },
  {
    prop: 'list_item',
    label: '列表单项匹配规则',
    width: 300
  },
  {
    prop: 'list_item_cover',
    label: '列表单项图片匹配规则',
    width: 400
  },
  {
    prop: 'list_item_name',
    label: '列表单项名称匹配规则',
    width: 400
  },
  {
    prop: 'detail_url',
    label: '单项访问地址',
    width: 400
  },
  {
    prop: 'play_url',
    label: '单项游戏play地址配规则',
    width: 400
  },
  {
    prop: 'create_at',
    label: '创建时间',
    width: 200,
    sortable: true
  },
  {
    prop: 'status',
    label: '规则状态',
    sortable: true,
    width: 160
  },
  {
    prop: 'counter_fetch',
    label: '共抓取几次',
    sortable: true,
    width: 160
  },
  {
    prop: 'last_fetch_date',
    label: '最后一次抓取的时间',
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

// 删除爬虫规则信息
const deleteAccount = async (params: User.ResUserList) => {
  await useHandleData(deleteCrawel, { id: [params.id] }, `删除【${params.username}规则`)
  proTable.value.refresh()
}

// 切换爬虫规则状态
const changeStatus = async (row: User.ResUserList) => {
  await useHandleData(changeCrawelStatus, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.username}】规则状态`)
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
    apiUrl: title === '新增' ? addCrawel : title === '编辑' ? editCrawel : '',
    getTableList: proTable.value.refresh
  }
  drawerRef.value!.acceptParams(params)
}
</script>
