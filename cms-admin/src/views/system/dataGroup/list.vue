<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :requestApi="SystemGroupDataApi.page"
      :initParam="initParam"
      :columns="columns"
      :pagination="true"
      :border="true"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="Back" @click="navigator('list')">返回数据组</el-button>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增数据</el-button>
      </template>
      <template #methods="{ row }">
        <span>{{ row.methods ? '[' + row.methods + '] ' + row.api_url : row.api_url }}</span>
      </template>
      <!-- 用户状态 slot -->
      <template #status="scope">
        <!-- 如果插槽的值为 el-switch，第一次加载会默认触发 switch 的 @change 方法，所有在外层包一个盒子，点击触发盒子 click 方法 -->
        <div @click="changeStatus(scope.row)">
          <el-switch
            :model-value="scope.row.status"
            :active-text="scope.row.status === 1 ? '启用' : '禁用'"
            :active-value="1"
            :inactive-value="0"
          />
        </div>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <FormDrawer :schema="schema" :title="drawerTitle" :initialValues="initialValues" ref="formRef"></FormDrawer>
  </div>
</template>

<script setup lang="ts" name="authIndex">
import { ref, reactive, computed } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import FormDrawer from '@/components/FormDrawer/FormDrawer.vue'
import { CirclePlus, Delete, EditPen, Back } from '@element-plus/icons-vue'
import { SystemGroupDataApi, SystemGroupData } from '@/api/modules'
import { useRouter, useRoute } from 'vue-router'
import * as Icons from '@element-plus/icons-vue'
import { genSchema } from './utils'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const route = useRoute()
const proTable = ref()
const router = useRouter()

const gid = computed(() => route.params.id || 0)

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = computed(() => ({
  gid: gid.value
}))

const navigator = (key: string) => {
  switch (key) {
    case 'list':
      router.push({
        path: '/system/data_group/index'
      })
      break
  }
}

const tableData = computed(() => (proTable.value ? proTable.value.tableData : []))

// 配置项
const columns = ref<Partial<ColumnProps>[]>([])
const schema = ref({})
function getTableHeader() {
  SystemGroupDataApi.tableHeader(+gid.value).then((res) => {
    console.log(res)
    if (res) {
      const headers = res.data!.header
      const tableHeaders: Partial<ColumnProps>[] = []
      console.log(headers)
      headers.forEach((header) => {
        tableHeaders.push({
          prop: header.key!,
          label: header.title,
          minWidth: header.minWidth
        })
      })
      tableHeaders.push({
        prop: 'operation',
        label: '操作',
        fixed: 'right'
      })
      columns.value = tableHeaders
      schema.value = genSchema(res.data?.fields || [])
      console.log(schema)
    }
  })
}
getTableHeader()

// 打开 drawer(新增、查看、编辑)
interface FormDrwerExpose {
  acceptParams: (params: any) => void
  handleOpen: (values: unknown) => SystemGroupData.Item
}

// 切换状态
const changeStatus = async (row: SystemGroupData.Item) => {
  // await useHandleData(AuthMenusApi.update, { i, status: row.status == 1 ? 0 : true }, `切换【${row.title}】状态`)
  proTable.value.refresh()
}

// 删除信息
const deleteAccount = async (params: SystemGroupData.Item) => {
  // if (params.children && params.children.length) {
  //   ElMessageBox.alert('该规则下有子规则，需要先删除子规则！', '温馨提示', {
  //     confirmButtonText: '确定',
  //     type: 'warning',
  //     draggable: true
  //   })
  //   return false
  // }
  await useHandleData(SystemGroupDataApi.remove, params.id, `是否确认删除【${params.name}】分类？`)
  proTable.value.refresh()
}

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
  acceptParams: (params: any) => void
}

const formRef = ref<FormDrwerExpose>()
const initialValues = ref<Partial<SystemGroupData.Item>>()
const drawerTitle = ref('')
const openDrawer = (title: string, rowData: Partial<SystemGroupData.Item> = {}, isEdit: boolean = false) => {
  initialValues.value = rowData
  let params = {
    title: title,
    rowData: { ...rowData },
    isEdit,
    isView: title === '查看' ? true : false,
    apiUrl: title === '新增' ? SystemGroupDataApi.add : title === '编辑' ? SystemGroupDataApi.update : '',
    getTableList: proTable.value.refresh
  }
  // drawerRef.value!.acceptParams(params)
  console.log('=====', 'pa')
  drawerTitle.value = title
  formRef.value!.acceptParams(params)
  formRef.value!.handleOpen((values: SystemGroupData.Item) => {
    values.gid = +gid.value
    return values
  })
}
</script>
