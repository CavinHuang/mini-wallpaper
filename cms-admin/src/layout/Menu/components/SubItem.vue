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
        <SubItem :menuList="subItem.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="subItem.path">
        <el-icon v-if="subItem.icon">
          <component :is="subItem.icon"></component>
        </el-icon>
        <template v-if="!subItem.is_link" #title>
          <span>{{ subItem.menu_name }}</span>
        </template>
        <template v-else #title>
          <a class="href" :href="subItem.is_link" target="_blank">{{ subItem.menu_name }}</a>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import { AuthMenu } from '@/api/modules'
const props = defineProps<{ menuList: AuthMenu.Item[] }>()
</script>

<style scoped lang="scss">
@import '../index.scss';
</style>
