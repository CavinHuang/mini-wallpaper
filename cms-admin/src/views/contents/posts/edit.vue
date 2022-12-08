<template>
  <div class="card edit-wrapper">
    <WangEditor height="400px" v-model:value="content" v-model:title="title" />
    <PostSetting ref="postSetting" />
    <el-footer class="submit-bar">
      <div class="submit-bar-content flx-center">
        <div class="back-top">回到顶部</div>
        <div class="font-count">字数：{{ fontCount }}</div>
        <div class="action-button">
          <el-button>预览</el-button>
          <el-button type="primary" @click="onSubmit()">保存文章</el-button>
        </div>
      </div>
    </el-footer>
  </div>
</template>

<script lang="ts" setup name="PostEdit">
import { ref } from 'vue'
import WangEditor from '@/components/WangEditor/index.vue'
import PostSetting from './components/PostFooter.vue'
import { PostApi } from '@/api/modules'
import { ElMessage } from 'element-plus';

type PostSetting = InstanceType<typeof PostSetting>

const content = ref('')
const title = ref('')
const fontCount = ref(0)
const postSetting = ref<PostSetting>()

const onSubmit = () => {
  postSetting.value?.validateForm().then(async (formData) => {
    console.log(formData)
    await PostApi.add({ ...formData, title: title.value, content: content.value })
    ElMessage.success('文章添加成功')
  })
}
</script>

<style lang="scss" scoped>
.edit-wrapper {
  padding-bottom: 40px;
  box-sizing: border-box;
}
.submit-bar {
  background-color: #f6f8f9;
  box-sizing: border-box;
  height: auto;
  .submit-bar-content {
    width: calc(100% - 40px);
    margin: 0 auto;
    margin-left: -40px;
    margin-right: -20px;
    background-color: #fff;
    padding: 20px 50px;
  }
  .back-top {
    margin-right: 40px;
  }
  .font-count {
    margin-right: 40px;
  }
  .action-button {
    flex: 1;
    margin-right: 20px;
    justify-content: flex-end;
    text-align: right;
  }
}
</style>
