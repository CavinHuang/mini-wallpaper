<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerData.title}用户`">
    <el-form ref="ruleFormRef" :rules="rules" :disabled="drawerData.isView" :model="drawerData.rowData" label-width="100px">
      <el-form-item label="用户姓名" prop="username" clearable>
        <el-input v-model="drawerData.rowData!.username" placeholder="请填写用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender" clearable>
        <el-select v-model="drawerData.rowData!.gender" placeholder="请选择性别" clearable>
          <el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" clearable>
        <el-input v-model="drawerData.rowData!.email" placeholder="请填写邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" clearable v-if="!drawerData.isEdit">
        <el-input type="password" v-model="drawerData.rowData!.password" placeholder="请填写用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm_password" clearable v-if="!drawerData.isEdit">
        <el-input type="password" v-model="drawerData.rowData!.confirm_password" placeholder="请填写用户姓名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerData.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { User } from '@/api/interface'
import { ref, reactive } from 'vue'
import { genderType } from '@/utils/serviceDict'
import { ElMessage, FormInstance } from 'element-plus'

const rules = reactive({
  username: [{ required: true, message: '请填写用户姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
  confirm_password: [{ required: true, message: '请再次填写密码', trigger: 'blur' }]
})

interface DrawerProps {
  title: string
  isView: boolean
  isEdit?: boolean
  rowData?: User.ResUserList & { password: string; confirm_password: string }
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
      ElMessage.success({ message: `${drawerData.value.title}用户成功！` })
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
