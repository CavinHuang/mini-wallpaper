<template>
  <div
    class="menu"
    :style="{ width: isCollapse ? '65px' : '200px' }"
    v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="loadingSvg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.01)"
  >
    <Logo :isCollapse="isCollapse"></Logo>
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :router="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        background-color="#191a20"
        text-color="#bdbdc0"
        active-text-color="#fff"
      >
        <SubItem :menuList="menuList"></SubItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { MenuStore } from '@/store/modules/menu'
import { AuthStore } from '@/store/modules/auth'
import { getMenuList } from '@/api/modules/login'
import { handleRouter } from '@/utils/util'
import { loadingSvg } from '@/utils/svg'
import Logo from './components/Logo.vue'
import SubItem from './components/SubItem.vue'
import { AuthMenu, AuthMenusApi } from '@/api/modules'

const loading = ref(false)

const route = useRoute()
const menuStore = MenuStore()
const authStore = AuthStore()

onMounted(async () => {
  // 获取菜单列表
  loading.value = true
  try {
    const res = await AuthMenusApi.tree()
    if (!res.data) return
    // 把路由菜单处理成一维数组（存储到 pinia 中）
    const [dynamicRouter, menusData] = handleRouter(res.data)
    console.log('🚀 ~ file: index.vue ~ line 55 ~ onMounted ~ menusData', menusData)
    authStore.setAuthRouter(dynamicRouter)
    menuStore.setMenuList(menusData)
  } finally {
    loading.value = false
  }
})

const activeMenu = computed((): string => route.path)
const isCollapse = computed((): boolean => menuStore.isCollapse)
const menuList = computed((): AuthMenu.Item[] => menuStore.menuList)

// aside 自适应
const screenWidth = ref<number>(0)
const screenHeight = ref<number>(0)
//监听窗口大小
const listeningWindow = () => {
  window.onresize = () => {
    return (() => {
      screenWidth.value = document.body.clientWidth
      screenHeight.value = document.body.clientHeight
      if (isCollapse.value === false && screenWidth.value < 1200) menuStore.setCollapse()
      if (isCollapse.value === true && screenWidth.value > 1200) menuStore.setCollapse()
    })()
  }
}
listeningWindow()
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
