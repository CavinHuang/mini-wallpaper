<template>
  <el-form-item label="上传类型" prop="upload_type" clearable>
    <el-select v-model="rowData!.upload_type" placeholder="请选择上传类型" clearable>
      <el-option v-for="item in uploadType" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </el-form-item>
</template>

<script lang="ts" setup>
import { System } from '@/api/interface/system.js'
import { PropType } from 'vue'

const props = defineProps({
  rowData: {
    type: Object as PropType<System.SystemConfigItem>,
    require: true
  }
})

const uploadType = [
  { value: 1, label: '单图' },
  { value: 2, label: '多图' },
  { value: 3, label: '文件' }
]
</script>
