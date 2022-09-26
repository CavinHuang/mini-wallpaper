<template>
  <el-form-item label="默认值" prop="value" clearable>
    <el-input type="textarea" v-model="rowData!.value" placeholder="请填写默认值"></el-input>
  </el-form-item>
  <el-form-item label="文本框宽(%)" prop="width" clearable>
    <el-input-number v-model="rowData!.width" placeholder="请填写文本框宽(%)"></el-input-number>
  </el-form-item>
  <el-form-item label="多行文本框高(%)" prop="height" clearable>
    <el-input-number v-model="rowData!.height" placeholder="请填写多行文本框高(%)"></el-input-number>
  </el-form-item>
</template>

<script lang="ts" setup>
import { System } from '@/api/interface/system'
import { PropType } from 'vue'

const props = defineProps({
  rowData: {
    type: Object as PropType<System.SystemConfigItem>,
    require: true
  }
})
</script>
