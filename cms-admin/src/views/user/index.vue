<template>
  <div class="table-box">
    <ProTable ref="proTable" :requestApi="getUserList" :initParam="initParam" :columns="columns">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
        <!-- <el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户</el-button> -->
        <!-- <el-button type="primary" :icon="Download" plain @click="downloadFile">导出用户数据</el-button> -->
        <!-- <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="batchDelete(scope.ids)">
          批量删除用户
        </el-button> -->
      </template>
      <!-- Expand -->
      <template #expand="scope"> {{ scope.row }} </template>
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
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row, true)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row, true)">编辑</el-button>
        <el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef"></UserDrawer>
    <ImportExcel ref="dialogRef"></ImportExcel>
  </div>
</template>

<script setup lang="tsx" name="adminList">
import { ref, reactive, h } from 'vue'
import { genderType } from '@/utils/serviceDict'
import { ElInput, ElFormItem } from 'element-plus'
import { User } from '@/api/interface'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import { useDownload } from '@/hooks/useDownload'
import ProTable from '@/components/ProTable/index.vue'
import ImportExcel from '@/components/ImportExcel/index.vue'
import UserDrawer from './components/UserDrawer.vue'
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from '@element-plus/icons-vue'
import {
  getUserList,
  deleteUser,
  editUser,
  addUser,
  resetUserPassWord,
  exportUserInfo,
  BatchAddUser,
  changeUserStatus
} from '@/api/modules/user'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({
  type: 1
})

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
    prop: 'appid',
    label: 'appid',
    width: 135
  },
  {
    prop: 'username',
    label: '用户名',
    search: true,
    width: 135
  },
  {
    prop: 'openid',
    label: 'openid',
    width: 135
  },
  {
    prop: 'nickname',
    label: '用户昵称'
  },
  {
    prop: 'avatar',
    label: '头像',
    image: true
  },
  {
    prop: 'gender',
    label: '性别',
    width: '140',
    enum: genderType,
    search: true,
    sortable: true,
    searchType: 'select'
  },
  {
    prop: 'province',
    label: '省份',
    width: '140'
  },
  {
    prop: 'city',
    label: '城市',
    width: '140'
  },
  {
    prop: 'group_id',
    label: '所属组',
    width: '140'
  },
  {
    prop: 'score',
    label: '积分',
    width: '140'
  },
  {
    prop: 'create_at',
    label: '创建时间',
    width: 200,
    sortable: true
  },
  {
    prop: 'status',
    label: '用户状态',
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

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
  await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`)
  proTable.value.refresh()
}

// 批量删除用户信息
const batchDelete = async (id: string[]) => {
  await useHandleData(deleteUser, { id }, '删除所选用户信息')
  proTable.value.refresh()
}

const data = reactive({
  id: -1,
  password: '',
  confirm_password: ''
})

// 重置用户密码
const resetPass = async (params: User.ResUserList) => {
  data.id = Number(params.id)
  await useHandleData(
    resetUserPassWord,
    data,
    '重置密码',
    h('div', { class: 'reset-password-container' }, [
      h(
        ElFormItem,
        { label: '密码', labelWidth: '120px' },
        {
          default: () =>
            h(ElInput, {
              type: 'password',
              modelValue: data.password,
              onInput: (password: string) => {
                console.log(password)
                data.password = password
              }
            })
        }
      ),
      h(
        ElFormItem,
        { label: '确认密码', labelWidth: '120px' },
        {
          default: () =>
            h(ElInput, {
              type: 'password',
              modelValue: data.confirm_password,
              onInput: (password: string) => {
                console.log(password)
                data.confirm_password = password
              }
            })
        }
      )
    ]),
    ''
  )
  // resetUserPassWord
  proTable.value.refresh()
}

// 切换用户状态
const changeStatus = async (row: User.ResUserList) => {
  await useHandleData(changeUserStatus, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.username}】用户状态`)
  proTable.value.refresh()
}

// 导出用户列表
const downloadFile = async () => {
  useDownload(exportUserInfo, '用户列表', proTable.value.searchParam)
}

// 批量添加用户
interface DialogExpose {
  acceptParams: (params: any) => void
}
const dialogRef = ref<DialogExpose>()
const batchAdd = () => {
  let params = {
    title: '用户',
    tempUrl: exportUserInfo,
    importUrl: BatchAddUser,
    getTableList: proTable.value.refresh
  }
  dialogRef.value!.acceptParams(params)
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
    apiUrl: title === '新增' ? addUser : title === '编辑' ? editUser : '',
    getTableList: proTable.value.refresh
  }
  drawerRef.value!.acceptParams(params)
}
</script>
