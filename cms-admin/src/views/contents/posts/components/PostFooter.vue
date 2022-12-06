<template>
  <div class="post-setting-container">
    <div class="post-setting-content">
      <el-form :model="form" label-width="160px">
        <el-form-item label="封面图">
          <el-radio-group v-model="thumbCount">
            <el-radio label="单图" />
            <el-radio label="三图" />
          </el-radio-group>
          <div class="poster-container"></div>
        </el-form-item>
        <el-form-item label="关联分类" prop="type">
          <el-checkbox-group v-model="form.cates">
            <el-checkbox border v-for="cate in categorys" :key="cate.id" :value="cate.id" :label="cate.short_name">
              {{ cate.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="关联标签" prop="type">
          <el-checkbox-group v-model="form.tags">
            <el-checkbox border v-for="tag in tags" :key="tag.id" :value="tag.id" :label="tag.tag_name">
              {{ tag.tag_name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否显示顶部图片">
          <el-switch v-model="form.show_header" />
        </el-form-item>
        <el-form-item label="评论开关">
          <el-switch v-model="form.switch_comment" />
        </el-form-item>
        <el-form-item label="访问积分">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-switch v-model="form.switch_score" />
            </el-col>
            <el-col :span="18"> <el-input v-if="form.switch_score" v-model="form.require_score" /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="访问密码">
          <el-row :gutter="20">
            <el-col :span="6"> <el-switch v-model="form.switch_password" /></el-col>
            <el-col :span="18"> <el-input v-if="form.switch_password" v-model="form.password" /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-switch v-model="form.direct_link_switch" />
            </el-col>
            <el-col :span="18"> <el-input v-if="form.direct_link_switch" v-model="form.direct_link" /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="需要激励广告">
          <el-switch v-model="form.switch_jili" />
        </el-form-item>
        <el-form-item label="热点标识">
          <el-row :gutter="20">
            <el-col :span="24"> <el-input v-model="form.badge" placeholder="请输入标签，比如：热门; 药材" /></el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup name="PostFooter">
import { Category, CategoryApi, MiniProgram, MiniProgramApi, Tag, TagApi } from '@/api/modules'
import { ca } from 'element-plus/es/locale';
import { onMounted, reactive, ref } from 'vue'

const form = reactive({
  show_header: true,
  switch_comment: true,
  require_score: 0,
  switch_score: false,
  switch_jili: false,
  switch_password: false,
  password: '',
  direct_link_switch: false,
  direct_link: '',
  badge: '',
  content: '',
  title: '',
  excerpt: '',
  thumbnail: [] as string[],
  cates: [] as Category.Item[],
  tags: [] as Tag.Item[]
})

const thumbCount = ref(3)

const miniPrograms = ref<MiniProgram.Item[]>([])
async function getMiniProgram() {
  const res = await MiniProgramApi.page({ pageSize: 10000, pageNum: 1 })
  miniPrograms.value = res.data?.rows || []
}

const categorys = ref<Category.Item[]>([])
async function getCategory() {
  const res = await CategoryApi.page({ pageSize: 10000, pageNum: 1, type: 'post' })
  categorys.value = res.data?.rows || []
}

const tags = ref<Tag.Item[]>([])
async function getTags() {
  const res = await TagApi.page({ pageSize: 10000, pageNum: 1, type: 'post' })
  tags.value = res.data?.rows || []
}

onMounted(async () => {
  await getMiniProgram()
  await getCategory()
  await getTags()
})
</script>

<style lang="scss" scoped>
.post-setting-container {
  background-color: #f6f8f9;
  padding-bottom: 40px;
  .post-setting-content {
    width: 850px;
    margin: 0 auto 20px auto;
    background-color: #fff;
    padding: 20px 50px 50px 50px;
    border: 1px solid #e8e8e8;
    box-shadow: 0 3px 8px rgb(215 220 233 / 50%);
  }
}
</style>
