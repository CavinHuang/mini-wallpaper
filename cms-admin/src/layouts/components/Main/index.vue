<template>
  <Tabs v-if="themeConfig.tabs" />
  <el-main>
    <router-view v-slot="{ Component }" :key="route.path">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="cacheRouter" v-if="isRouterRefresh">
          <div class="page-content-root">
            <component :is="Component" :key="route.path" />
          </div>
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
  <el-footer v-if="themeConfig.footer">
    <Footer />
  </el-footer>
</template>

<script setup lang="ts" name="appMain">
import { ref, computed, nextTick, provide } from 'vue'
import { useRoute } from 'vue-router'
import { GlobalStore } from '@/store'
import cacheRouter from '@/routers/cacheRouter'
import Tabs from '@/layouts/components/Tabs/index.vue'
import Footer from '@/layouts/components/Footer/index.vue'

const route = useRoute()
const globalStore = GlobalStore()
const themeConfig = computed(() => globalStore.themeConfig)

// 刷新当前页面
const isRouterRefresh = ref(true)
const refreshCurrentPage = () => {
  isRouterRefresh.value = false
  nextTick(function () {
    isRouterRefresh.value = true
  })
}
provide('refresh', refreshCurrentPage)
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
