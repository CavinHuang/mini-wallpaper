<template>
  <el-form-item label="配置参数" prop="parameter" clearable>
    <el-input type="textarea" v-model="rowData!.parameter" placeholder="参数方式例如:\n1=>男\n2=>女\n3=>保密"></el-input>
  </el-form-item>
  <el-form-item label="默认值" prop="value" clearable>
    <el-input v-model="rowData!.value" placeholder="请输入默认值"></el-input>
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
