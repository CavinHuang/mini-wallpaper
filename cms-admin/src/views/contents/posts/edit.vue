<template>
  <div class="card edit-wrapper">
    <WangEditor height="400px" v-model:value="content" />

    <PostSetting />
  </div>
</template>

<script lang="ts" setup name="PostEdit">
import { ref } from 'vue'
import WangEditor from '@/components/WangEditor/index.vue'
import PostSetting from './components/PostFooter.vue'

const content = ref('')
</script>

<style lang="scss" scoped></style>
