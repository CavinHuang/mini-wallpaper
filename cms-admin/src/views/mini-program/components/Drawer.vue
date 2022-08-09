<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerData.title}游戏`">
    <el-form ref="ruleFormRef" :rules="rules" :disabled="drawerData.isView" :model="drawerData.rowData" label-width="180px">
      <el-form-item label="名称" prop="name" clearable>
        <el-input v-model="drawerData.rowData!.name" placeholder="请填写名称"></el-input>
      </el-form-item>
      <el-form-item label="appid" prop="appid" clearable>
        <el-input v-model="drawerData.rowData!.appid" placeholder="请填写appid"></el-input>
      </el-form-item>
      <el-form-item label="appid" prop="appid" clearable>
        <el-input v-model="drawerData.rowData!.appsecret" placeholder="请填写appsecret"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerData.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { MinProgram } from '@/api/interface/minProgram'

const rules = reactive({
  name: [{ required: true, message: '请填写名称', trigger: 'blur' }]
})

interface DrawerProps {
  title: string
  isView: boolean
  isEdit?: boolean
  rowData?: MinProgram.Item
  apiUrl?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

// drawer框状态
const drawerVisible = ref(false)
const drawerData = ref<DrawerProps>({
  isView: false,
  title: '',
  isEdit: false
})

const coverType = ref('1')

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  drawerData.value = params
  drawerVisible.value = true
}

const ruleFormRef = ref<FormInstance>()
// 提交数据（新增/编辑）
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
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
