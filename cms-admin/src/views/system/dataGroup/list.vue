<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :requestApi="SystemGroupApi.page"
      :initParam="initParam"
      :columns="columns"
      :pagination="true"
      :border="true"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
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
        <el-button type="primary" link :icon="View" @click="navigator('list', scope.row.id)">配置列表</el-button>
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
import { CirclePlus, Delete, EditPen, View } from '@element-plus/icons-vue'
import { SystemGroupApi, SystemGroup } from '@/api/modules'
import { useRouter } from 'vue-router'
import * as Icons from '@element-plus/icons-vue'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()
const router = useRouter()
const customIcons: { [key: string]: any } = Icons

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({})

const navigator = (key: string, id: number) => {
  switch (key) {
    case 'list':
      router.push({
        path: '/system/config/system_config_tab/' + id
      })
  }
}

const tableData = computed(() => (proTable.value ? proTable.value.tableData : []))

// 配置项
const columns: Partial<ColumnProps>[] = [
  {
    label: '#',
    prop: 'id',
    width: 80
  },
  {
    prop: 'config_name',
    label: 'KEY',
    width: 160
  },
  {
    prop: 'name',
    label: '数据组名称',
    align: 'center'
  },
  {
    prop: 'info',
    label: '简介',
    align: 'left'
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right'
  }
]

// 打开 drawer(新增、查看、编辑)
interface FormDrwerExpose {
  acceptParams: (params: any) => void
  handleOpen: (values: unknown) => AuthMenu.Item
}
const schema = reactive({
  name: {
    type: 'string',
    title: '数据组名称',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  config_name: {
    type: 'string',
    title: '数据字段',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  info: {
    type: 'string',
    title: '数据简介',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  cate_id: {
    type: 'number',
    title: '数类型',
    required: true,
    default: 1,
    enum: [
      {
        label: '默认',
        value: 0
      },
      {
        label: '数据',
        value: 1
      }
    ],
    'x-decorator': 'FormItem',
    'x-component': 'Radio.Group'
  },
  fields: {
    type: 'array',
    'x-component': 'ArrayItems',
    'x-decorator': 'FormItem',
    title: '字段',
    items: {
      type: 'object',
      properties: {
        space: {
          type: 'void',
          'x-component': 'Space',
          properties: {
            name: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '字段名称：姓名'
              }
            },
            title: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '字段配置名：name'
              }
            },
            type: {
              type: 'string',
              enum: [
                {
                  label: '文本框',
                  value: 'input'
                },
                {
                  label: '多行文本框',
                  value: 'textarea'
                },
                {
                  label: '单选框',
                  value: 'radio'
                },
                {
                  label: '多选框',
                  value: 'checkbox'
                },
                {
                  label: '下拉选择',
                  value: 'select'
                },
                {
                  label: '单图',
                  value: 'upload'
                },
                {
                  label: '多图',
                  value: 'uploads'
                }
              ],
              'x-decorator': 'FormItem',
              'x-component': 'Select',
              'x-component-props': {
                placeholder: '字段类型'
              }
            }
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove'
          }
        },
        param: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-component-props': {
            placeholder: '字段类型',
            style: {
              width: '100%'
            }
          },
          'x-reactions': {
            dependencies: ['.type'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === "radio" || $deps[0] === "checkbox" || $deps[0] === "select"}}'
              }
            }
          }
        }
      }
    },
    properties: {
      add: {
        type: 'void',
        title: '添加条目',
        'x-component': 'ArrayItems.Addition'
      }
    }
  }
})

// 切换状态
const changeStatus = async (row: SystemGroup.Item) => {
  // await useHandleData(AuthMenusApi.update, { i, status: row.status == 1 ? 0 : true }, `切换【${row.title}】状态`)
  proTable.value.refresh()
}

// 删除信息
const deleteAccount = async (params: SystemGroup.Item) => {
  // if (params.children && params.children.length) {
  //   ElMessageBox.alert('该规则下有子规则，需要先删除子规则！', '温馨提示', {
  //     confirmButtonText: '确定',
  //     type: 'warning',
  //     draggable: true
  //   })
  //   return false
  // }
  await useHandleData(SystemGroupApi.remove, params.id, `是否确认删除【${params.name}】分类？`)
  proTable.value.refresh()
}

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
  acceptParams: (params: any) => void
}

const formRef = ref<FormDrwerExpose>()
const initialValues = ref<Partial<SystemGroup.Item>>()
const drawerTitle = ref('')
const openDrawer = (title: string, rowData: Partial<SystemGroup.Item> = {}, isEdit: boolean = false) => {
  initialValues.value = rowData
  let params = {
    title: title,
    rowData: { ...rowData },
    isEdit,
    isView: title === '查看' ? true : false,
    apiUrl: title === '新增' ? SystemGroupApi.add : title === '编辑' ? SystemGroupApi.update : '',
    getTableList: proTable.value.refresh
  }
  // drawerRef.value!.acceptParams(params)
  console.log('=====', 'pa')
  drawerTitle.value = title
  formRef.value!.acceptParams(params)
  formRef.value!.handleOpen((values: SystemGroup.Item & { pid: number | number[] }) => {
    if (Array.isArray(values.pid)) {
      values.pid = values.pid[values.pid.length - 1]
    }
    return values
  })
}
</script>
