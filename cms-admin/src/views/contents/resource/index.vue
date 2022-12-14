<template>
  <div class="main-box">
    <div class="table-box">
      <div class="card select-box">
        <SelectFilter :data="selectFilterData" :defaultValues="selectFilterValues" @change="changeSelectFilter" />
      </div>
      <ProTable ref="proTable" :requestApi="ResourceApi.page" :initParam="initParam" :columns="columns">
        <!-- 表格 header 按钮 -->
        <template #tableHeader>
          <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增资源</el-button>
        </template>
        <template #url="{ row }">
          <el-image
            class="table-wall-image"
            v-if="row.thumb_url.indexOf('/') > -1"
            :src="row.thumb_url.indexOf('http') > -1 ? row.thumb_url : qiniuResourceUrl(row.thumb_url)"
          />
        </template>
        <!-- 状态 slot -->
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
  </div>
  <FormDrawer :schema="schema" :title="drawerTitle" :initialValues="initialValues" ref="formRef"></FormDrawer>
</template>

<script setup lang="ts" name="resourceList">
import { ref, reactive, onMounted, computed, ComputedRef } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import SelectFilter from '@/components/SelectFilter/index.vue'
import { CirclePlus, Delete, EditPen, View } from '@element-plus/icons-vue'
import { MiniProgram, MiniProgramApi, ResourceApi, CategoryApi, Category, TagApi, Tag, Resource } from '@/api/modules'
import { ElMessage } from 'element-plus'
import { DataProps } from '@/components/SelectFilter/types'
import FormDrawer from '@/components/FormDrawer/FormDrawer.vue'
import { genSchema } from './schema'
import { qiniuResourceUrl } from '@/hooks/customer'
import { GlobalStore } from '@/store'

const globalStore = GlobalStore()

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({})

// 配置项
const columns: Partial<ColumnProps>[] = [
  {
    label: '#',
    width: 60,
    prop: 'id',
    fixed: 'left'
  },
  {
    prop: 'appid',
    label: '所属小程序',
    width: 135
  },
  {
    prop: 'name',
    label: '名称',
    width: 140
  },
  {
    prop: 'info',
    label: '说明',
    width: 260
  },
  {
    prop: 'url',
    label: '链接',
    width: 120
  },
  {
    prop: 'upload_type',
    label: '上传类型',
    width: 100
  },
  {
    prop: 'price',
    label: '价格',
    width: 80
  },
  {
    prop: 'vip_price',
    label: 'VIP价格',
    width: 100
  },
  {
    prop: 'is_hot',
    label: '热门',
    width: 80
  },
  {
    prop: 'is_recommend',
    label: '推荐',
    width: 80
  },
  {
    prop: 'sort',
    label: '排序',
    width: 80
  },
  {
    prop: 'status',
    label: '状态',
    sortable: true,
    width: 100
  },
  {
    prop: 'create_at',
    label: '创建时间',
    width: 200,
    sortable: true
  },
  {
    prop: 'operation',
    label: '操作',
    width: 240,
    fixed: 'right'
  }
]

// 默认 selectFilter 参数
const selectFilterValues = ref({ userStatus: '2', userRole: ['1', '3'] })
const changeSelectFilter = (val: any) => {
  ElMessage.success('请注意查看请求参数变化 🤔')
  val.userStatus = val.userStatus.join('')
  selectFilterValues.value = val
}

// 删除信息
const deleteAccount = async (params: Resource.Item) => {
  await useHandleData(ResourceApi.remove, params.id, `删除【${params.name}】`)
  proTable.value.refresh()
}

// 切换状态
const changeStatus = async (row: Resource.Item) => {
  await useHandleData(ResourceApi.update, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.name}】状态`)
  proTable.value.refresh()
}

const miniPrograms = ref<MiniProgram.Item[]>([])
async function getMiniProgram() {
  const res = await MiniProgramApi.page({ pageSize: 10000, pageNum: 1 })
  miniPrograms.value = res.data?.rows || []
}

const categorys = ref<Category.Item[]>([])
async function getCategory() {
  const res = await CategoryApi.page({ pageSize: 10000, pageNum: 1, type: 'resource' })
  categorys.value = res.data?.rows || []
}

const tags = ref<Tag.Item[]>([])
async function getTags() {
  const res = await TagApi.page({ pageSize: 10000, pageNum: 1, type: 'resource' })
  tags.value = res.data?.rows || []
}

// selectFilter 数据
const selectFilterData = computed(() => {
  return [
    {
      title: '所属应用',
      key: 'appid',
      options: [
        {
          label: '全部',
          value: ''
        },
        ...miniPrograms.value.map((item) => ({ label: item.name, value: item.appid }))
      ]
    },
    {
      title: '推荐操作',
      key: 'action',
      multiple: true,
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '热门',
          value: 'is_hot'
        },
        {
          label: '推荐',
          value: 'is_recommend'
        }
      ]
    },
    {
      title: '所属分类',
      key: 'category',
      multiple: true,
      options: [
        {
          label: '全部',
          value: ''
        },
        ...categorys.value.map((item) => ({ label: item.short_name, value: item.id }))
      ]
    },
    {
      title: '关联标签',
      key: 'tag',
      multiple: true,
      options: [
        {
          label: '全部',
          value: ''
        },
        ...tags.value.map((item) => ({ label: item.tag_name, value: item.id }))
      ]
    }
  ]
}) as ComputedRef<DataProps[]>

onMounted(() => {
  getMiniProgram()
  getCategory()
  getTags()
})

const { schema, setCategories, setMiniprograms, setTags } = genSchema()

// 打开 drawer(新增、查看、编辑)
interface FormDrwerExpose {
  acceptParams: (params: any) => void
  handleOpen: (values: unknown) => Tag.Item
}
const qiniuHttpHost = computed(() => globalStore.getAppData('qiniuHttpHost')?.value)

const formRef = ref<FormDrwerExpose>()
const initialValues = ref<Partial<Resource.Item>>()
const drawerTitle = ref('')
const openDrawer = (
  title: string,
  rowData: Partial<Resource.Item> & { cover?: any[]; cover2?: string; urlType?: number } = {},
  isEdit: boolean = false
) => {
  initialValues.value = rowData
  setMiniprograms(miniPrograms.value.map((item) => ({ label: item.name, value: item.appid })))
  setTags(tags.value.map((item) => ({ label: item.tag_name, value: item.id })))
  setCategories(categorys.value.map((item) => ({ label: item.name, value: item.id })))

  rowData.tags = rowData.tags!.map((item) => item.id) as any
  rowData.categories = rowData.categories![0].id as any
  if (rowData.thumb_url?.includes('http')) {
    rowData.cover2 = rowData.url!.join('\r\n')
    rowData.urlType = 2
  } else {
    rowData.cover = rowData.url!.map((item) => {
      return {
        name: 'xxxx',
        url: qiniuResourceUrl(item)
      }
    })
    rowData.urlType = 1
    // setFileList(rowData.cover)
  }
  console.log('🚀 ~ file: index.vue ~ line 280 ~ rowData', rowData)
  let params = {
    title: title,
    rowData: { ...rowData },
    isEdit,
    isView: title === '查看' ? true : false,
    apiUrl: title === '新增' ? ResourceApi.add : title === '编辑' ? ResourceApi.update : '',
    getTableList: proTable.value.refresh
  }
  drawerTitle.value = title
  formRef.value!.acceptParams(params)
  formRef.value!.handleOpen((values: Resource.Item & { cover: any[]; cover2: string; urlType: number }) => {
    values.url =
      values.urlType === 1
        ? values.cover.map((item: any) => {
            return item.name ? item.url.replace(qiniuHttpHost.value, '') : item.response ? item.response.key : ''
          })
        : (values.cover2 as any)
    values.upload_type = 'qiniu'
    return values
  })
}
</script>

<style lang="scss" scoped>
.select-box {
  padding: 4px 20px;
  margin-bottom: 10px;
}
</style>
