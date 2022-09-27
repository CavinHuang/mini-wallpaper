<template>
  <div class="table-box">
    <ProTable ref="proTable" :requestApi="AuthAdminApi.page" :initParam="initParam" :columns="columns" :pagination="true">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增管理员</el-button>
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
    <FormDrawer
      :schema="schema"
      :success="formActionSchema"
      :title="drawerTitle"
      :initialValues="initialValues"
      ref="formRef"
    ></FormDrawer>
  </div>
</template>

<script setup lang="ts" name="authRole">
import { ref, reactive, h, onMounted } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import FormDrawer from '@/components/FormDrawer/FormDrawer.vue'
import { CirclePlus, Delete, EditPen, View } from '@element-plus/icons-vue'
import { AuthAdminApi, AuthAdmin, AuthRoleApi, AuthRole } from '@/api/modules'

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
    prop: 'username',
    label: '用户名',
    search: true
  },
  {
    prop: 'nickname',
    label: '昵称',
    search: true
  },
  {
    prop: 'status',
    label: '状态',
    sortable: true
  },
  {
    prop: 'last_action_user',
    label: '最后操作人'
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right'
  }
]

// 删除信息
const deleteAccount = async (params: AuthAdmin.adminItem) => {
  await useHandleData(AuthAdminApi.delete, params.id, `是否确认删除【${params.nickname}】分类？`)
  proTable.value.refresh()
}

// 切换分类状态
const changeStatus = async (row: AuthAdmin.adminItem) => {
  await useHandleData(AuthAdminApi.update, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.nickname}】状态`)
  proTable.value.refresh()
}

// 打开 drawer(新增、查看、编辑)
interface FormDrwerExpose {
  acceptParams: (params: any) => void
  handleOpen: () => void
}
const schema = reactive({
  username: {
    type: 'string',
    title: '用户名',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  nickname: {
    type: 'string',
    title: '昵称',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  password: {
    type: 'string',
    title: '密码',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      type: 'password',
      'show-password': true,
      checkStrength: true
    },
    'x-reactions': [
      {
        dependencies: ['.confirm_password'],
        fulfill: {
          state: {
            selfErrors: '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}'
          }
        }
      }
    ]
  },
  confirm_password: {
    type: 'string',
    title: '确认密码',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      type: 'password',
      'show-password': true,
      checkStrength: true
    },
    'x-reactions': [
      {
        dependencies: ['.password'],
        fulfill: {
          state: {
            selfErrors: '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}'
          }
        }
      }
    ]
  },
  role_id: {
    type: 'string',
    title: '角色',
    enum: [] as { label: string; value: string }[],
    'x-decorator': 'FormItem',
    'x-component': 'Select',
    'x-component-props': {
      style: 'width: 240px;'
    }
  },
  is_super: {
    type: 'boolean',
    title: '是否超级管理',
    required: true,
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

const roleData = ref<AuthRole.RoleItem[]>([])

const getRoleData = () => {
  AuthRoleApi.page({ pageNum: 1, pageSize: 1000 }).then((res) => {
    roleData.value = res.data?.rows || []
    schema.role_id.enum = roleData.value.map((item) => {
      return {
        label: item.role_name,
        value: item.id
      }
    })
  })
}

onMounted(() => {
  getRoleData()
})

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

const formActionSchema = (values: AuthAdmin.adminItem) => {}
</script>
