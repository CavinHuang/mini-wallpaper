<template>
  <div class="post-setting-container">
    <div class="post-setting-content">
      <el-form :model="form" :rules="rules" label-width="160px" ref="ruleFormRef">
        <el-form-item label="封面图">
          <el-radio-group v-model="thumbCount">
            <el-radio :label="1" :value="1">单图</el-radio>
            <el-radio :label="3" :value="3">三图</el-radio>
          </el-radio-group>
          <draggable
            class="poster-container"
            v-model="thumnails"
            tag="transition-group"
            :component-data="{
              tag: 'ul',
              type: 'transition-group',
              name: !drag ? 'flip-list' : null
            }"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
            item-key="id"
          >
            <template #item="{ element }">
              <li class="thumb-item">
                <img :src="element" alt="" />
              </li>
            </template>
          </draggable>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea" :row="5" v-model="form.excerpt" placeholder="请输入摘要" />
        </el-form-item>
        <el-form-item label="关联分类" prop="categories">
          <el-checkbox-group v-model="form.categories">
            <el-checkbox
              v-for="cate in categorys"
              border
              :key="cate.id"
              :value="cate.id"
              :label="cate.id"
              style="margin-bottom: 10px"
            >
              {{ cate.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="关联标签" prop="tags">
          <el-checkbox-group v-model="form.tags">
            <el-checkbox border v-for="tag in tags" :key="tag.id" :value="tag.id" :label="tag.id" style="margin-bottom: 10px">
              {{ tag.tag_name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否显示顶部图片">
          <el-switch v-model="form.showHeader" />
        </el-form-item>
        <el-form-item label="评论开关">
          <el-switch v-model="form.switchComment" />
        </el-form-item>
        <el-form-item label="访问积分" prop="require_score">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-switch v-model="form.switchScore" />
            </el-col>
            <el-col :span="18"> <el-input v-if="form.switchScore" v-model="form.requireScore" /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="访问密码" prop="password">
          <el-row :gutter="20">
            <el-col :span="6"> <el-switch v-model="form.switchPassword" /></el-col>
            <el-col :span="18"> <el-input v-if="form.switchPassword" v-model="form.password" /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="跳转链接" prop="direct_link">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-switch v-model="form.directLinkSwitch" />
            </el-col>
            <el-col :span="18"> <el-input v-if="form.directLinkSwitch" v-model="form.directLink" /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="需要激励广告">
          <el-switch v-model="form.switchJili" />
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
import { onMounted, reactive, ref, watch } from 'vue'
import { Category, CategoryApi, MiniProgram, MiniProgramApi, Tag, TagApi } from '@/api/modules'
import draggable from 'vuedraggable'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const form = reactive({
  showHeader: true,
  switchComment: true,
  requireScore: 0,
  switchScore: false,
  switchJili: false,
  switchPassword: false,
  password: '',
  directLinkSwitch: false,
  directLink: '',
  badge: '',
  content: '',
  title: '',
  excerpt: '',
  thumbnail: [] as string[],
  categories: [] as Category.Item[],
  tags: [] as Tag.Item[],
  appid: ''
})

const validateSecondParam = (field: keyof typeof form) => (rule: any, value: any, callback: any) => {
  if (form[field] === true) {
    if (value === '' || isNaN(Number(value))) {
      callback(new Error('请输入一个数值'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  categories: [
    {
      type: 'array',
      required: true,
      message: '请至少选择一个分类',
      trigger: 'change'
    }
  ],
  tags: [
    {
      type: 'array',
      required: true,
      message: '请至少选择一个标签',
      trigger: 'change'
    }
  ],
  require_score: [{ validator: validateSecondParam('switchScore'), trigger: 'blur' }],
  password: [{ validator: validateSecondParam('switchPassword'), trigger: 'blur' }],
  direct_link: [{ validator: validateSecondParam('directLinkSwitch'), trigger: 'blur' }]
})
const thumbCount = ref(1)
const allThumbs = ref([])
const thumnails = ref<string[]>([])
const drag = ref(false)
const dragOptions = reactive({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost'
})

watch(
  thumbCount,
  (val) => {
    const _thumb = allThumbs.value.slice(0, val)
    thumnails.value = _thumb.length >= val ? _thumb : [..._thumb, ...new Array(val - _thumb.length).fill('')]
    console.log('🚀 ~ file: PostFooter.vue:137 ~ watch ~ thumnails', thumnails)
  },
  { immediate: true }
)

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

const validateForm = (): Promise<typeof form> => {
  return new Promise((resolve, reject) => {
    if (!ruleFormRef.value) reject('没有这样的表单')
    ruleFormRef.value?.validate((valid) => {
      const cate = categorys.value.find((item) => item.id === form.categories[0].id)
      form.appid = cate ? cate.appid : ''
      if (valid) resolve(form)
      else reject('表单提交失败')
    })
  })
}

defineExpose({
  validateForm
})
</script>

<style lang="scss" scoped>
.post-setting-container {
  background-color: #f6f8f9;
  padding-bottom: 20px;
  .post-setting-content {
    width: 850px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px 50px;
    border: 1px solid #e8e8e8;
    box-shadow: 0 3px 8px rgb(215 220 233 / 50%);
  }
  .poster-container {
    width: 100%;
    padding-left: 0;
    li {
      list-style: none;
    }
    .thumb-item {
      width: 180px;
      height: 120px;
      margin-right: 14px;
      vertical-align: bottom;
      border: 1px solid #e9ecf3;
      border-radius: 8px;
      cursor: pointer;
      display: inline-block;
      position: relative;
    }
  }
}
</style>
