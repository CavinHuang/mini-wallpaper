<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <template v-if="!subItem.hidden">
      <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
        <template #title>
          <el-icon v-if="subItem.icon">
            <component :is="subItem.icon"></component>
          </el-icon>
          <span>{{ subItem.menu_name }}</span>
        </template>
        <SubMenu :menuList="subItem.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
        <el-icon v-if="subItem.icon">
          <component :is="subItem.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ subItem.menu_name }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import { AuthMenu } from '@/api/modules'
import { useRouter } from 'vue-router'

defineProps<{ menuList: AuthMenu.Item[] }>()

const router = useRouter()
const handleClickMenu = (subItem: AuthMenu.Item) => {
  if (subItem.is_link) window.open(subItem.is_link, '_blank')
  router.push(subItem.path)
}
</script>
