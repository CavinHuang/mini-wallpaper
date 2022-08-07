<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerData.title}爬虫规则`">
    <el-form ref="ruleFormRef" :rules="rules" :disabled="drawerData.isView" :model="drawerData.rowData" label-width="180px">
      <el-form-item label="规则名称" prop="name" clearable>
        <el-input v-model="drawerData.rowData!.name" placeholder="请填写规则名称"></el-input>
      </el-form-item>
      <el-form-item label="主站地址" prop="name" clearable>
        <el-input type="textarea" v-model="drawerData.rowData!.domain" placeholder="请填写主站地址"></el-input>
      </el-form-item>
      <el-form-item label="列表获取的url" prop="name" clearable>
        <el-input type="textarea" v-model="drawerData.rowData!.list_url" placeholder="请填写列表获取的url"></el-input>
      </el-form-item>
      <el-form-item label="列表单项匹配规则" prop="name" clearable>
        <el-input type="textarea" v-model="drawerData.rowData!.list_item" placeholder="请填写列表单项匹配规则"></el-input>
      </el-form-item>
      <el-form-item label="列表单项图片匹配规则" prop="name" clearable>
        <el-input
          type="textarea"
          v-model="drawerData.rowData!.list_item_cover"
          placeholder="请填写列表单项图片匹配规则"
        ></el-input>
      </el-form-item>
      <el-form-item label="列表单项名称匹配规则" prop="name" clearable>
        <el-input
          type="textarea"
          v-model="drawerData.rowData!.list_item_name"
          placeholder="请填写列表单项名称匹配规则"
        ></el-input>
      </el-form-item>
      <el-form-item label="单项访问地址" prop="name" clearable>
        <el-input type="textarea" v-model="drawerData.rowData!.detail_url" placeholder="请填写单项访问地址"></el-input>
      </el-form-item>
      <el-form-item label="单项游戏play地址配规则" prop="name" clearable>
        <el-input type="textarea" v-model="drawerData.rowData!.play_url" placeholder="请填写单项游戏play地址配规则"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerData.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { Crawel } from '@/api/interface'
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'

const rules = reactive({
  name: [{ required: true, message: '请填写规则名称', trigger: 'blur' }],
  domain: [{ required: true, message: '请填写主站地址', trigger: 'blur' }],
  list_url: [{ required: true, message: '请填写列表单项匹配规则', trigger: 'blur' }],
  list_item: [{ required: true, message: '请填写列表单项匹配规则', trigger: 'blur' }],
  list_item_cover: [{ required: true, message: '请填写列表单项图片匹配规则', trigger: 'blur' }],
  list_item_name: [{ required: true, message: '请填写列表单项名称匹配规则', trigger: 'blur' }],
  detail_url: [{ required: true, message: '请填写单项访问地址', trigger: 'blur' }],
  play_url: [{ required: true, message: '请填写单项游戏play地址配规则', trigger: 'blur' }]
})

interface DrawerProps {
  title: string
  isView: boolean
  isEdit?: boolean
  rowData?: Crawel.list
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
      ElMessage.success({ message: `${drawerData.value.title}爬虫规则成功！` })
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
