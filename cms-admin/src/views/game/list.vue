<template>
  <div class="table-box">
    <ProTable ref="proTable" :requestApi="getGameList" :initParam="initParam" :columns="columns">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <!-- <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增规则</el-button> -->
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
      <template #cover="scope">
        <!-- 如果插槽的值为 el-switch，第一次加载会默认触发 switch 的 @change 方法，所有在外层包一个盒子，点击触发盒子 click 方法 -->
        <div :data="JSON.stringify(scope.row.cover)"></div>
        <el-image
          :src="getAssetsImage(scope.row.cover)"
          :preview-src-list="[getAssetsImage(scope.row.cover)]"
          fit="cover"
          class="table-image"
          preview-teleported
        />
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row, true)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row, true)">编辑</el-button>
        <!-- <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button> -->
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
import { EditPen, View } from '@element-plus/icons-vue'
import { getGameList, addGame, editGame } from '@/api/modules/game'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({})

/**
 * @description：支持手机端
 */
const mobileType = [
  { label: '是', value: 1 },
  { label: '否', value: 0 }
]
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
    label: '游戏名称',
    search: true,
    width: 200
  },
  {
    prop: 'cate_name',
    label: '游戏分类',
    width: 200
  },
  {
    prop: 'cover',
    label: '游戏封面',
    width: '140',
    image: true
  },
  {
    prop: 'mobile',
    label: '支持手机端',
    width: '80',
    sortable: true,
    search: true,
    searchType: 'select',
    enum: mobileType
  },
  {
    prop: 'play_url',
    label: '游戏地址',
    width: 500
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
    prop: 'sort',
    label: '排序',
    sortable: true,
    width: 160
  },
  {
    prop: 'views_count',
    label: '访问量',
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
  return cover.indexOf('http') > -1 ? cover : '/game-thumb/' + cover
}

// 切换爬虫规则状态
const changeStatus = async (row: Game.cate) => {
  await useHandleData(editGame, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.name}】游戏状态`)
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
    apiUrl: title === '新增' ? addGame : title === '编辑' ? editGame : '',
    getTableList: proTable.value.refresh
  }
  drawerRef.value!.acceptParams(params)
}
</script>
