<template>
  <div class="main-box" style="display: block">
    <div class="table-box" style="width: 100%">
      <div class="card select-box">
        <SelectFilter :data="selectFilterData" :defaultValues="selectFilterValues" @change="changeSelectFilter" />
      </div>
    </div>
    <div class="card post-container">
      <div class="action-button">
        <el-button type="primary" :icon="CirclePlus" @click="editPost">新增文章</el-button>
      </div>

      <PostItem v-for="post in postData" :key="post.id" :post="post" @delete-row="deleteRow" />

      <div class="page-footer" style="display: flex; justify-content: flex-end; margin-top: 12px">
        <el-pagination
          hide-on-single-page
          v-model:current-page="pageInfo.pageNum"
          v-model:page-size="pageInfo.pageSize"
          layout="prev, pager, next, jumper"
          :total="pageInfo.total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="PostIndex">
import { Category, CategoryApi, MiniProgram, MiniProgramApi, Tag, TagApi, Post, PostApi } from '@/api/modules'
import SelectFilter from '@/components/SelectFilter/index.vue'
import { DataProps } from '@/components/SelectFilter/types'
import { ElMessage } from 'element-plus'
import { computed, ComputedRef, ref, reactive, onActivated, onMounted } from 'vue'
import PostItem from './components/PostItem.vue'
import { CirclePlus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useHandleData } from '@/hooks/useHandleData'

const router = useRouter()

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

// 默认 selectFilter 参数
const selectFilterValues = ref({ userStatus: '2', userRole: ['1', '3'] })
const changeSelectFilter = (val: any) => {
  ElMessage.success('请注意查看请求参数变化 🤔')
  val.userStatus = val.userStatus.join('')
  selectFilterValues.value = val
}

const editPost = () => {
  router.push({
    path: '/posts/edit',
    params: {
      action: 'add'
    }
  })
}

const pageInfo = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const postData = ref<Post.Item[]>([])
const fetchPost = () => {
  const params = {
    pageNum: pageInfo.value.pageNum,
    pageSize: pageInfo.value.pageSize
  }
  PostApi.page(params).then((res) => {
    postData.value = res.data?.rows || []
    pageInfo.value.total = res.data?.total || 0
  })
}
const handleCurrentChange = (pageNo: number) => {
  pageInfo.value.pageNum = pageNo
  fetchPost()
}
// 删除用户信息
const deleteRow = async (params: Post.Item) => {
  await useHandleData(PostApi.remove, params.id, `删除【${params.title}】文章`)
  await fetchPost()
}
onMounted(() => {
  fetchPost()
})
onActivated(() => {
  console.log('onActivated')
})
</script>

<style lang="scss" scoped>
.post-container {
  width: 100%;
  margin-top: 16px;
}
</style>
