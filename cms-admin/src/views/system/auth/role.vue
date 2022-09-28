<template>
  <div class="table-box">
    <ProTable ref="proTable" :requestApi="AuthRoleApi.page" :initParam="initParam" :columns="columns" :pagination="true">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增角色</el-button>
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
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row, true)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row, true)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <FormDrawer :schema="schema" :success="formActionSchema" :title="drawerTitle" ref="formRef"></FormDrawer>
  </div>
</template>

<script setup lang="tsx" name="authRole">
import { ref, reactive, onMounted } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import FormDrawer from '@/components/FormDrawer/FormDrawer.vue'
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from '@element-plus/icons-vue'
import { AuthRoleApi, AuthRole, AuthMenu } from '@/api/modules'
import { AuthMenusApi } from '@/api/modules/authMenu'

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
    prop: 'role_name',
    label: '角色名称',
    search: true,
    width: 120
  },
  {
    prop: 'role_code',
    label: '角色编码',
    search: true,
    width: 120
  },
  {
    prop: 'status',
    label: '状态',
    sortable: true,
    width: 140
  },
  {
    prop: 'remark',
    label: '角色说明'
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right'
  }
]

// 删除信息
const deleteAccount = async (params: AuthRole.RoleItem) => {
  await useHandleData(AuthRoleApi.delete, params.id, `是否确认删除【${params.role_name}】分类？`)
  proTable.value.refresh()
}

// 切换分类状态
const changeStatus = async (row: AuthRole.RoleItem) => {
  await useHandleData(AuthRoleApi.update, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.role_name}】分类状态`)
  proTable.value.refresh()
}

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
  acceptParams: (params: any) => void
}

interface FormDrwerExpose {
  acceptParams: (params: any) => void
  handleOpen: () => void
}

const menuData = ref<AuthMenu.Item[]>([])

onMounted(async () => {
  const result = await AuthMenusApi.tree()
  menuData.value = result.data || []
})

const schema = {
  role_name: {
    type: 'string',
    title: '角色名称',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  role_code: {
    type: 'string',
    title: '角色编码',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  role_auth: {
    type: 'string',
    title: '权限',
    dataSource: [],
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'FormTree',
    'x-component-props': {
      data: [
        {
          id: 1,
          label: 'Level one 1',
          children: [
            {
              id: 4,
              label: 'Level two 1-1',
              children: [
                {
                  id: 9,
                  label: 'Level three 1-1-1'
                },
                {
                  id: 10,
                  label: 'Level three 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: 'Level one 2',
          children: [
            {
              id: 5,
              label: 'Level two 2-1'
            },
            {
              id: 6,
              label: 'Level two 2-2'
            }
          ]
        },
        {
          id: 3,
          label: 'Level one 3',
          children: [
            {
              id: 7,
              label: 'Level two 3-1'
            },
            {
              id: 8,
              label: 'Level two 3-2'
            }
          ]
        }
      ]
    }
  },
  remark: {
    type: 'string',
    title: '角色说明',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input.TextArea'
  }
}

const drawerRef = ref<DrawerExpose>()
const formRef = ref<FormDrwerExpose>()
const drawerTitle = ref('')
const openDrawer = (title: string, rowData: Partial<AuthRole.RoleItem> = {}, isEdit: boolean = false) => {
  let params = {
    title: title,
    rowData: { ...rowData },
    isEdit,
    isView: title === '查看' ? true : false,
    apiUrl: title === '新增' ? AuthRoleApi.add : title === '编辑' ? AuthRoleApi.update : '',
    getTableList: proTable.value.refresh
  }
  // drawerRef.value!.acceptParams(params)
  drawerTitle.value = title
  formRef.value!.acceptParams(params)
  formRef.value!.handleOpen()
}

const formActionSchema = (values: AuthRole.RoleItem) => {}
</script>
