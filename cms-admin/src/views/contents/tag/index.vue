<template>
  <div class="table-box">
    <ProTable ref="proTable" :requestApi="TagApi.page" :initParam="initParam" :columns="columns" :pagination="true">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增标签</el-button>
      </template>
      <!-- 分类状态 slot -->
      <template #status="scope">
        <!-- 如果插槽的值为 el-switch，第一次加载会默认触发 switch 的 @change 方法，所有在外层包一个盒子，点击触发盒子 click 方法 -->
        <div @click="changeStatus(scope.row)">
          <el-switch
            :modelValue="scope.row.status"
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
  </div>
  <FormDrawer :schema="schema" :title="drawerTitle" :initialValues="initialValues" ref="formRef"></FormDrawer>
</template>

<script setup lang="ts" name="TagList">
import { ref, reactive, onMounted } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import { CirclePlus, Delete, EditPen, View } from '@element-plus/icons-vue'
import FormDrawer from '@/components/FormDrawer/FormDrawer.vue'
import { TagApi, Tag, MiniProgram } from '@/api/modules'
import { MiniProgramApi } from '../../../api/modules/minProgram'

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
    prop: 'tag_name',
    label: '名称',
    search: true,
    width: 200
  },
  {
    prop: 'remark',
    label: '说明'
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
    prop: 'create_at',
    label: '创建时间',
    width: 210,
    sortable: true
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right'
  }
]

// 删除分类信息
const deleteAccount = async (params: Tag.Item) => {
  await useHandleData(TagApi.remove, params.id, `确认删除【${params.tag_name}】分类？`)
  proTable.value.refresh()
}

// 切换分类状态
const changeStatus = async (row: Tag.Item) => {
  await useHandleData(TagApi.update, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.tag_name}】分类状态`)
  proTable.value.refresh()
}

// 打开 drawer(新增、查看、编辑)
interface FormDrwerExpose {
  acceptParams: (params: any) => void
  handleOpen: (values: unknown) => Tag.Item
}
const schema = reactive({
  appid: {
    type: 'string',
    title: '所属小程序',
    required: true,
    enum: [] as any,
    'x-decorator': 'FormItem',
    'x-component': 'Select'
  },
  type: {
    type: 'string',
    title: '标签类型',
    required: true,
    enum: [] as any,
    'x-decorator': 'FormItem',
    'x-component': 'Select'
  },
  tag_name: {
    type: 'string',
    title: '名称',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  remark: {
    type: 'string',
    title: '说明',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input.TextArea'
  },
  sort: {
    type: 'string',
    title: '排序',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'InputNumber'
  }
})

const miniPrograms = ref<MiniProgram.Item[]>()
async function getMiniProgram() {
  const res = await MiniProgramApi.page({ pageSize: 10000, pageNum: 1 })
  miniPrograms.value = res.data?.rows || []
}

const tagTypes = ref<BaseDictOptions[]>()
async function getType() {
  const res = await TagApi.getType()
  tagTypes.value = res.data || []
}

onMounted(() => {
  getMiniProgram()
  getType()
})

const formRef = ref<FormDrwerExpose>()
const initialValues = ref<Partial<Tag.Item>>()
const drawerTitle = ref('')
const openDrawer = (title: string, rowData: Partial<Tag.Item> = {}, isEdit: boolean = false) => {
  initialValues.value = rowData
  schema.appid.enum = miniPrograms.value
    ? miniPrograms.value.map((item) => {
        return {
          label: item.name,
          value: item.appid
        }
      })
    : []
  schema.type.enum = tagTypes.value
    ? tagTypes.value.map((item) => {
        return {
          label: item.label,
          value: item.key
        }
      })
    : []
  let params = {
    title: title,
    rowData: { ...rowData },
    isEdit,
    isView: title === '查看' ? true : false,
    apiUrl: title === '新增' ? TagApi.add : title === '编辑' ? TagApi.update : '',
    getTableList: proTable.value.refresh
  }
  drawerTitle.value = title
  formRef.value!.acceptParams(params)
  formRef.value!.handleOpen((values: Tag.Item & { pid: number | number[] }) => {
    if (Array.isArray(values.pid)) {
      values.pid = values.pid[values.pid.length - 1]
    }
    return values
  })
}
</script>
