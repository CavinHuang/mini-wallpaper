<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerData.title}配置分类`">
    <el-form ref="ruleFormRef" :rules="rules" :disabled="drawerData.isView" :model="drawerData.rowData" label-width="100px">
      <el-form-item label="父级分类" prop="pid" clearable>
        <el-select v-model="drawerData.rowData!.pid" placeholder="请选择父级分类" clearable>
          <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="title" clearable>
        <el-input v-model="drawerData.rowData!.title" placeholder="请填写分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类字段英文" prop="eng_title" clearable>
        <el-input v-model="drawerData.rowData!.eng_title" placeholder="请填写分类字段英文"></el-input>
      </el-form-item>
      <el-form-item label="分类icon" prop="icon" clearable>
        <SelectIcon v-model:iconValue="drawerData.rowData!.icon"></SelectIcon>
      </el-form-item>
      <el-form-item label="类型" prop="type" clearable>
        <el-radio-group v-model="drawerData.rowData!.type">
          <el-radio :label="1">系统</el-radio>
          <el-radio :label="0">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="display" clearable>
        <el-radio-group v-model="drawerData.rowData!.display">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort" clearable>
        <el-input v-model="drawerData.rowData!.sort" placeholder="请填写排序"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerData.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive, watch } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { System } from '@/api/interface/system.js'
import { SystemApi } from '@/api/modules'
import SelectIcon from '@/components/SelectIcon/index.vue'

const rules = reactive({
  pid: [{ required: true, message: '请选择父级分类', trigger: 'change' }],
  title: [{ required: true, message: '请填写分类名称', trigger: 'blur' }],
  eng_title: [{ required: true, message: '请填写分类字段英文', trigger: 'blur' }],
  type: [{ required: true, message: '请选择分类', trigger: 'change' }]
})

interface DrawerProps {
  title: string
  isView: boolean
  rowData?: System.SystemConfigTabItem
  apiUrl?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

// drawer框状态
const drawerVisible = ref(false)
const drawerData = ref<DrawerProps>({
  isView: false,
  title: ''
})

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  drawerData.value = params
  drawerVisible.value = true
}

const selectOptions = ref<Array<{ label: string; value: number }>>([])

const requestOptions = () => {
  SystemApi.getSelectOptions().then((res) => {
    selectOptions.value = res.data || []
  })
}

watch(drawerVisible, (val) => {
  if (drawerVisible.value) {
    requestOptions()
  }
})

const ruleFormRef = ref<FormInstance>()
// 提交数据（新增/编辑）
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      console.log(drawerData.value)
      if (!drawerData.value.apiUrl) return
      await drawerData.value.apiUrl(drawerData.value.rowData)
      ElMessage.success({ message: `${drawerData.value.title}成功！` })
      drawerData.value.getTableList && drawerData.value.getTableList()
      drawerVisible.value = false
    } catch (error) {
      console.log(error)
    }
  })
}

defineExpose({
  acceptParams
})
</script>
