<template>
  <div class="table-box">
    <ProTable ref="proTable" :requestApi="CategoryApi.page" :initParam="initParam" :columns="columns" :pagination="true">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增规则</el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope"> {{ scope.row }} </template>
      <!-- 分类状态 slot -->
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
import { Game } from '@/api/interface'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import UserDrawer from './components/UserDrawer.vue'
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from '@element-plus/icons-vue'
import { CategoryApi } from '@/api/modules'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({})

// 配置项
const columns: Partial<ColumnProps>[] = [
  {
    type: 'index',
    label: '#',
    width: 80
  },
  {
    prop: 'appid',
    label: '所属小程序',
    search: true,
    width: 200
  },
  {
    prop: 'type',
    label: '类型',
    width: 200
  },
  {
    prop: 'name',
    label: '分类名称',
    search: true,
    width: 200
  },
  {
    prop: 'short_name',
    label: '分类简称',
    width: 200
  },
  {
    prop: 'keywords',
    label: '关键词',
    width: 200
  },
  {
    prop: 'covor',
    label: '图标/封面',
    image: true,
    width: 100
  },
  {
    prop: 'create_at',
    label: '创建时间',
    width: 210,
    sortable: true
  },
  {
    prop: 'status',
    label: '状态',
    sortable: true,
    width: 160
  },
  {
    prop: 'weigh',
    label: '排序',
    sortable: true,
    width: 160
  },
  {
    prop: 'operation',
    label: '操作',
    width: 160,
    fixed: 'right'
  }
]

const getAssetsImage = (cover: string) => {
  return cover.indexOf('http') > -1 ? cover : new URL('/src/assets/images/game/' + cover, import.meta.url).href
}

// 删除分类信息
const deleteAccount = async (params: Game.cate) => {
  await useHandleData(CategoryApi.remove, params.id, `确认删除【${params.name}】分类？`)
  proTable.value.refresh()
}

// 切换分类状态
const changeStatus = async (row: Game.cate) => {
  await useHandleData(CategoryApi.update, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.name}】分类状态`)
  proTable.value.refresh()
}

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
  acceptParams: (params: any) => void
}
const drawerRef = ref<DrawerExpose>()
const openDrawer = (title: string, rowData: Partial<Game.cate> = {}, isEdit: boolean = false) => {
  let params = {
    title: title,
    rowData: { ...rowData },
    isEdit,
    isView: title === '查看' ? true : false,
    apiUrl: title === '新增' ? CategoryApi.add : title === '编辑' ? CategoryApi.update : '',
    getTableList: proTable.value.refresh
  }
  drawerRef.value!.acceptParams(params)
}
</script>
