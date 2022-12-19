<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="removeTab">
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :path="item.path"
          :label="item.title"
          :name="item.fullPath || item.path"
          :closable="item.close"
        >
          <template #label>
            <el-icon class="tabs-icon" v-if="item.icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <MoreButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TabsStore } from '@/store/modules/tabs'
import { TabsPaneContext } from 'element-plus'
import MoreButton from './components/MoreButton.vue'

const tabStore = TabsStore()
const tabsMenuList = computed(() => tabStore.tabsMenuList)
const tabsMenuValue = computed({
  get: () => {
    return tabStore.tabsMenuValue
  },
  set: (val) => {
    console.log('🚀 ~ file: index.vue:40 ~ val', val)
    tabStore.setTabsMenuValue(val)
  }
})

const route = useRoute()
const router = useRouter()
// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.path,
  () => {
    let params = {
      ...route,
      title: route.meta.title as string,
      path: route.path,
      query: route.query,
      close: true
    }
    tabStore.addTabs(params)
  },
  {
    immediate: true
  }
)

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
  console.log('🚀 ~ file: index.vue:66 ~ tabClick ~ tabItem', tabItem)
  let path = tabItem.props.name as string
  router.push(path)
}

// Remove Tab
const removeTab = (activeTabPath: string) => {
  tabStore.removeTabs(activeTabPath)
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
