<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerData.title}用户`">
    <el-form ref="ruleFormRef" :rules="rules" :disabled="drawerData.isView" :model="drawerData.rowData" label-width="100px">
      <el-form-item label="所属小程序" prop="appid" clearable>
        <el-select v-model="drawerData.rowData!.appid" placeholder="请选择所属小程序" clearable>
          <el-option v-for="item in miniProgram" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="轮播图位置" prop="position" clearable>
        <el-select v-model="drawerData.rowData!.position" placeholder="请选择轮播图位置" clearable>
          <el-option v-for="item in positions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="轮播图标题" prop="title" clearable>
        <el-input v-model="drawerData.rowData!.title" placeholder="请填写轮播图标题"></el-input>
      </el-form-item>
      <el-form-item label="轮播图" prop="cover" clearable>
        <el-input v-model="drawerData.rowData!.cover" placeholder="请填写轮播图url"></el-input>
      </el-form-item>
      <el-form-item label="轮播图链接" prop="link" clearable>
        <el-input v-model="drawerData.rowData!.link" placeholder="请填写轮播图链接url"></el-input>
      </el-form-item>
      <el-form-item label="轮播图背景色" prop="background" clearable>
        <el-input v-model="drawerData.rowData!.background" placeholder="请填写轮播图背景色"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="display" clearable>
        <el-radio-group v-model="drawerData.rowData!.status">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort" clearable>
        <el-input-number v-model="drawerData.rowData!.sort" placeholder="请填写排序"></el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerData.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { Banner } from '@/api/interface'
import { ref, reactive, watch } from 'vue'
import { genderType } from '@/utils/serviceDict'
import { ElMessage, FormInstance } from 'element-plus'
import { MiniProgramApi } from '@/api/modules'

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
  rowData?: Banner.Item
  apiUrl?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

const positions = [{ value: 'home', label: '首页顶部' }]

// drawer框状态
const drawerVisible = ref(false)
const drawerData = ref<DrawerProps>({
  isView: false,
  title: '',
  isEdit: false
})

const miniProgram = ref<Array<{ value: string; label: string }>>([])
function getMiniProgram() {
  MiniProgramApi.getList({
    pageNum: 1,
    pageSize: 100,
    name: ''
  }).then((res) => {
    miniProgram.value = res.data
      ? res.data.rows.map((item) => {
          return {
            value: item.appid,
            label: item.name
          }
        })
      : []
  })
}

watch(drawerVisible, () => {
  if (drawerVisible.value) {
    getMiniProgram()
  }
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
