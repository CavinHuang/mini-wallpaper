<template>
  <div class="card">
    <div class="banner-position">
      <div class="left-content">
        <div class="edit-text">编辑图片</div>
        <div class="position-title">首页顶部</div>
      </div>
      <div class="icon-image">
        <ElIcon class="icon">
          <Picture />
        </ElIcon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="banner">
import { ElIcon } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-wrap: wrap;
}
.banner-position {
  height: 110px;
  width: 400px;
  display: flex;
  flex-wrap: nowrap;
  background: linear-gradient(-113deg, #c543d8, #925cc3) !important;
  line-height: 3em;
  box-shadow: 0 0 6px 1px rgb(0 0 0 / 20%);
  border-radius: 3px;
  color: #fff;
  padding: 15px 25px;
  cursor: pointer;
  .left-content {
    font-size: 18px;
    flex: 1;
    .edit-text {
      font-size: 14px;
    }
  }
  .icon-image {
    width: 60px;
    font-size: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.6;
  }
}
</style>
