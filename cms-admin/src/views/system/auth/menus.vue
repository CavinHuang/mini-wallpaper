<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :requestApi="AuthMenusApi.tree"
      :initParam="initParam"
      :columns="columns"
      :pagination="false"
      :border="false"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增规则</el-button>
      </template>
      <!-- <template #title="scope">
        <el-icon><CaretRight /></el-icon>
        <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template> -->
      <template #methods="{ row }">
        <span>{{ row.methods ? '[' + row.methods + '] ' + row.api_url : row.api_url }}</span>
      </template>
      <template #icon="{ row }">
        <el-button v-if="row.icon" :icon="customIcons[row.icon]" />
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
import { AuthMenu, AuthMenusApi } from '@/api/modules'
import { useRouter } from 'vue-router'
import * as Icons from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

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
    type: 'index',
    label: '#',
    prop: 'id',
    width: 80
  },
  {
    prop: 'menu_name',
    label: '按钮名称',
    width: 160
  },
  {
    prop: 'icon',
    label: '图标',
    align: 'center',
    width: 80
  },
  {
    prop: 'methods',
    label: '接口路径',
    align: 'left'
  },
  {
    prop: 'unique_auth',
    label: '前端权限',
    align: 'left'
  },
  {
    prop: 'path',
    label: '页面路由',
    align: 'left'
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

// 打开 drawer(新增、查看、编辑)
interface FormDrwerExpose {
  acceptParams: (params: any) => void
  handleOpen: (values: unknown) => AuthMenu.Item
}
const schema = reactive({
  auth_type: {
    type: 'boolean',
    title: '类型',
    required: true,
    default: 1,
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
          title: '{{$deps[0] === 1 ? "按钮名称" : "接口名称"}}'
        }
      }
    }
  },
  pid: {
    type: 'string',
    title: '父级页面',
    enum: tableData,
    'x-decorator': 'FormItem',
    'x-component': 'Cascader',
    'x-component-props': {
      style: 'width: 240px;',
      props: {
        label: 'menu_name',
        checkStrictly: true,
        value: 'id'
      }
    }
  },
  api_url: {
    type: 'string',
    title: '接口地址',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-reactions': {
      dependencies: ['auth_type'],
      fulfill: {
        state: {
          visible: '{{$deps[0] === 2}}'
        }
      }
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
  methods: {
    type: 'string',
    title: '请求方式',
    required: true,
    enum: [
      {
        value: '',
        label: '请求'
      },
      {
        value: 'GET',
        label: 'GET'
      },
      {
        value: 'POST',
        label: 'POST'
      },
      {
        value: 'PUT',
        label: 'PUT'
      },
      {
        value: 'DELETE',
        label: 'DELETE'
      }
    ],
    'x-decorator': 'FormItem',
    'x-component': 'Select',
    'x-reactions': {
      dependencies: ['auth_type'],
      fulfill: {
        state: {
          visible: '{{$deps[0] === 2}}'
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
    'x-component': 'SelectIcon',
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
    default: false,
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
    'x-component': 'Radio.Group',
    'x-reactions': {
      dependencies: ['auth_type'],
      fulfill: {
        state: {
          visible: '{{$deps[0] === 1}}'
        }
      }
    }
  }
})

// 切换状态
const changeStatus = async (row: AuthMenu.Item) => {
  // await useHandleData(AuthMenusApi.update, { i, status: row.status == 1 ? 0 : true }, `切换【${row.title}】状态`)
  proTable.value.refresh()
}

// 删除信息
const deleteAccount = async (params: AuthMenu.Item) => {
  if (params.children && params.children.length) {
    ElMessageBox.alert('该规则下有子规则，需要先删除子规则！', '温馨提示', {
      confirmButtonText: '确定',
      type: 'warning',
      draggable: true
    })
    return false
  }
  await useHandleData(AuthMenusApi.delete, params.id, `是否确认删除【${params.menu_name}】分类？`)
  proTable.value.refresh()
}

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
  acceptParams: (params: any) => void
}

const formRef = ref<FormDrwerExpose>()
const initialValues = ref<Partial<AuthMenu.Item>>()
const drawerTitle = ref('')
const openDrawer = (title: string, rowData: Partial<AuthMenu.Item> = {}, isEdit: boolean = false) => {
  initialValues.value = rowData
  let params = {
    title: title,
    rowData: { ...rowData },
    isEdit,
    isView: title === '查看' ? true : false,
    apiUrl: title === '新增' ? AuthMenusApi.add : title === '编辑' ? AuthMenusApi.update : '',
    getTableList: proTable.value.refresh
  }
  // drawerRef.value!.acceptParams(params)
  console.log('=====', 'pa')
  drawerTitle.value = title
  formRef.value!.acceptParams(params)
  formRef.value!.handleOpen((values: AuthMenu.Item & { pid: number | number[] }) => {
    if (Array.isArray(values.pid)) {
      values.pid = values.pid[values.pid.length - 1]
    }
    return values
  })
}
</script>
