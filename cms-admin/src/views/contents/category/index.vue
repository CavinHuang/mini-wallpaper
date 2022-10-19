<template>
  <div class="table-box">
    <ProTable ref="proTable" :requestApi="CategoryApi.page" :initParam="initParam" :columns="columns" :pagination="true">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope"> {{ scope.row }} </template>
      <!-- 分类状态 slot -->
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
      <template #covor="{ row }">
        <el-image
          class="table-image"
          v-if="row.cover.indexOf('/') > -1"
          :src="row.cover.indexOf('http') > -1 ? row.cover : qiniuResourceUrl(row.cover)"
        />
        <el-button v-else-if="row.cover" :icon="customIcons[row.cover]" />
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row, true)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row, true)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <FormDrawer :schema="schema" :title="drawerTitle" :initialValues="initialValues" ref="formRef"></FormDrawer>
  </div>
</template>

<script setup lang="tsx" name="adminList">
import { ref, reactive, h, onMounted } from 'vue'
import { Game } from '@/api/interface'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import FormDrawer from '@/components/FormDrawer/FormDrawer.vue'
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from '@element-plus/icons-vue'
import { CategoryApi, Category, MiniProgramApi, MiniProgram } from '@/api/modules'
import { schemaRequest } from '@/utils/schemaUpload'
import { pictureComponent } from '@/components/Formily/imageUploaderShow'
import * as Icons from '@element-plus/icons-vue'
import { qiniuResourceUrl } from '@/hooks/customer'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()
const customIcons: { [key: string]: any } = Icons

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({})

// 配置项
const columns: Partial<ColumnProps>[] = [
  {
    prop: 'id',
    label: '#',
    width: 60
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
    width: 120
  },
  {
    prop: 'name',
    label: '分类名称',
    search: true,
    width: 160
  },
  {
    prop: 'short_name',
    label: '分类简称',
    width: 100
  },
  {
    prop: 'keywords',
    label: '关键词',
    width: 160
  },
  {
    prop: 'covor',
    label: '图标/封面',
    image: true,
    width: 100
  },
  {
    prop: 'status',
    label: '状态',
    sortable: true,
    width: 120
  },
  {
    prop: 'sort',
    label: '排序',
    sortable: true,
    width: 90
  },
  {
    prop: 'create_at',
    label: '创建时间',
    sortable: true
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right'
  }
]

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
    title: '分类类型',
    required: true,
    enum: [] as any,
    'x-decorator': 'FormItem',
    'x-component': 'Select'
  },
  name: {
    type: 'string',
    title: '名称',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  short_name: {
    type: 'string',
    title: '简称',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  iconType: {
    type: 'boolean',
    title: '标志类型',
    required: true,
    default: 1,
    enum: [
      {
        label: '图片',
        value: 1
      },
      {
        label: '图标',
        value: 2
      }
    ],
    'x-decorator': 'FormItem',
    'x-component': 'Radio.Group',
    'x-component-props': {}
  },
  icon: {
    type: 'string',
    title: '图标',
    default: '',
    'x-decorator': 'FormItem',
    'x-component': 'SelectIcon',
    'x-reactions': {
      dependencies: ['iconType'],
      fulfill: {
        state: {
          visible: '{{$deps[0] === 2}}'
        }
      }
    }
  },
  cover: {
    type: 'array',
    title: '上传资源',
    'x-decorator': 'FormItem',
    'x-component': 'Upload',
    'x-component-props': {
      httpRequest: schemaRequest,
      class: 'banner-uploader',
      multiple: false,
      showFileList: false
    },
    required: true,
    'x-content': {
      default: pictureComponent()
    },
    'x-reactions': [
      {
        dependencies: ['iconType'],
        fulfill: {
          state: {
            visible: '{{$deps[0] === 1}}'
          }
        }
      }
    ]
  },
  description: {
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
interface FormDrwerExpose {
  acceptParams: (params: any) => void
  handleOpen: (values: unknown) => Category.Item
}
const miniPrograms = ref<MiniProgram.Item[]>()
async function getMiniProgram() {
  const res = await MiniProgramApi.page({ pageSize: 10000, pageNum: 1 })
  miniPrograms.value = res.data?.rows || []
}

const tagTypes = ref<BaseDictOptions[]>()
async function getType() {
  const res = await CategoryApi.getType()
  tagTypes.value = res.data || []
}

onMounted(() => {
  getMiniProgram()
  getType()
})

const formRef = ref<FormDrwerExpose>()
const initialValues = ref<Partial<Category.Item>>()
const drawerTitle = ref('')
const openDrawer = (title: string, rowData: Partial<Category.Item> = {}, isEdit: boolean = false) => {
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
  rowData.cover = rowData.cover
    ? ([
        {
          response: {
            key: rowData.cover
          }
        }
      ] as any)
    : []
  let params = {
    title: title,
    rowData: { ...rowData },
    isEdit,
    isView: title === '查看' ? true : false,
    apiUrl: title === '新增' ? CategoryApi.add : title === '编辑' ? CategoryApi.update : '',
    getTableList: proTable.value.refresh
  }
  drawerTitle.value = title
  formRef.value!.acceptParams(params)
  formRef.value!.handleOpen((values: Category.Item & { iconType: number; icon: string }) => {
    if (values.iconType === 2) {
      values.cover = values.icon
    } else {
      values.cover = (values.cover as any)[0].response.key
    }

    return values
  })
}
</script>
