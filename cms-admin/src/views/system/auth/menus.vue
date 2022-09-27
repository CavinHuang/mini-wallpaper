<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :requestApi="SystemApi.getList"
      :initParam="initParam"
      :columns="columns"
      :pagination="false"
      :border="false"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('添加')">添加配置分类</el-button>
      </template>
      <!-- <template #title="scope">
        <el-icon><CaretRight /></el-icon>
        <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template> -->
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
        <el-button type="primary" link :icon="View" @click="navigator('list', scope.row.id)">配置列表</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <!-- <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button> -->
      </template>
    </ProTable>
    <FormDrawer :schema="schema" :title="drawerTitle" :initialValues="initialValues" ref="formRef"></FormDrawer>
  </div>
</template>

<script setup lang="ts" name="authIndex">
import { ref, reactive } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import FormDrawer from '@/components/FormDrawer/FormDrawer.vue'
import { CirclePlus, Delete, EditPen, View } from '@element-plus/icons-vue'
import { AuthAdmin, AuthAdminApi, SystemApi } from '@/api/modules'
import { System } from '@/api/interface'
import { useRouter } from 'vue-router'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()
const router = useRouter()

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({
  type: 1
})

const navigator = (key: string, id: number) => {
  switch (key) {
    case 'list':
      router.push({
        path: '/system/config/system_config_tab/' + id
      })
  }
}

// 配置项
const columns: Partial<ColumnProps>[] = [
  {
    type: 'index',
    label: '#',
    prop: 'id',
    width: 80
  },
  {
    prop: 'title',
    label: '按钮名称',
    align: 'left',
    width: 160
  },
  {
    prop: 'eng_title',
    label: '接口路径'
  },
  {
    prop: 'eng_title',
    label: '前端权限'
  },
  {
    prop: 'eng_title',
    label: '页面路由'
  },
  {
    prop: 'status',
    label: '状态',
    sortable: true
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right'
  }
]

function getAllIds(row: System.SystemConfigTabItem) {
  const ids: number[] = []
  ids.push(row.id)
  if (row.children && row.children.length) {
    row.children.forEach((item) => {
      ids.push(...getAllIds(item))
    })
  }
  return ids
}

// 打开 drawer(新增、查看、编辑)
interface FormDrwerExpose {
  acceptParams: (params: any) => void
  handleOpen: () => void
}
const schema = reactive({
  auth_type: {
    type: 'boolean',
    title: '类型',
    required: true,
    default: true,
    enum: [
      {
        label: '接口',
        value: 2
      },
      {
        label: '菜单(包含页面按钮)',
        value: 1
      }
    ],
    'x-decorator': 'FormItem',
    'x-component': 'Radio.Group'
    // 'x-reactions': {
    //   target: '*(menu_name,nickname)',
    //   fulfill: { state: { visible: '{{$self.value === 1}}' } }
    // }
  },
  menu_name: {
    type: 'string',
    title: '按钮名称',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-reactions': {
      dependencies: ['auth_type'],
      fulfill: {
        state: {
          visible: '{{$deps[0] === 1}}'
        }
      }
    }
  },
  pid: {
    type: 'string',
    title: '父级页面',
    enum: [] as { label: string; value: string }[],
    'x-decorator': 'FormItem',
    'x-component': 'Select',
    'x-component-props': {
      style: 'width: 240px;'
    }
  },
  path: {
    type: 'string',
    title: '路由地址',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-reactions': {
      dependencies: ['auth_type'],
      fulfill: {
        state: {
          visible: '{{$deps[0] === 1}}'
        }
      }
    }
  },
  unique_auth: {
    type: 'string',
    title: '权限标识',
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  icon: {
    type: 'string',
    title: '图标',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-reactions': {
      dependencies: ['auth_type'],
      fulfill: {
        state: {
          visible: '{{$deps[0] === 1}}'
        }
      }
    }
  },
  sort: {
    type: 'string',
    title: '排序',
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  hidden: {
    type: 'boolean',
    title: '隐藏菜单',
    enum: [
      {
        label: '是',
        value: true
      },
      {
        label: '否',
        value: false
      }
    ],
    'x-decorator': 'FormItem',
    'x-component': 'Radio.Group'
  }
})

// 切换状态
const changeStatus = async (row: System.SystemConfigTabItem) => {
  const hasChildren = row.children && row.children.length
  const ids = getAllIds(row)
  await useHandleData(SystemApi.changeStatus, { ids, status: row.status == 1 ? 0 : true }, `切换【${row.title}】状态`)
  proTable.value.refresh()
}

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
  acceptParams: (params: any) => void
}

const formRef = ref<FormDrwerExpose>()
const initialValues = ref<Partial<AuthAdmin.adminItem>>()
const drawerTitle = ref('')
const openDrawer = (title: string, rowData: Partial<AuthAdmin.adminItem> = {}, isEdit: boolean = false) => {
  initialValues.value = rowData

  if (isEdit) {
    // @ts-ignore
    delete schema.password
    // @ts-ignore
    delete schema.confirm_password
  }

  let params = {
    title: title,
    rowData: { ...rowData },
    isEdit,
    isView: title === '查看' ? true : false,
    apiUrl: title === '新增' ? AuthAdminApi.add : title === '编辑' ? AuthAdminApi.update : '',
    getTableList: proTable.value.refresh
  }
  // drawerRef.value!.acceptParams(params)
  drawerTitle.value = title
  formRef.value!.acceptParams(params)
  formRef.value!.handleOpen()
}
</script>
