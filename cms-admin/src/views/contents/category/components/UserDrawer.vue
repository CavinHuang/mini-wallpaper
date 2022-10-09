<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerData.title}游戏`">
    <el-form ref="ruleFormRef" :rules="rules" :disabled="drawerData.isView" :model="drawerData.rowData" label-width="180px">
      <el-form-item label="名称" prop="name" clearable>
        <el-input v-model="drawerData.rowData!.name" placeholder="请填写名称"></el-input>
      </el-form-item>
      <el-form-item label="分类key" prop="name" clearable>
        <el-input v-model="drawerData.rowData!.slug" placeholder="请填写分类key"></el-input>
      </el-form-item>
      <div class="" style="margin-left: 180px">
        <el-radio-group v-model="coverType" class="ml-4">
          <el-radio label="1">图片</el-radio>
          <el-radio label="2">icon</el-radio>
        </el-radio-group>
      </div>
      <el-form-item label="分类封面" prop="cover" clearable v-if="coverType === '1'">
        <el-input type="textarea" v-model="drawerData.rowData!.image" placeholder="请输入封面图片地址"></el-input>
      </el-form-item>
      <el-form-item label="分类icon" prop="icon" clearable v-if="coverType === '2'">
        <SelectIcon v-model:iconValue="drawerData.rowData!.icon"></SelectIcon>
      </el-form-item>
      <el-form-item label="排序" prop="name" clearable>
        <el-input type="number" v-model="drawerData.rowData!.sort" placeholder="请填写排序"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerData.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { Game } from '@/api/interface'
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import SelectIcon from '@/components/SelectIcon/index.vue'

const rules = reactive({
  name: [{ required: true, message: '请填写名称', trigger: 'blur' }]
})

interface DrawerProps {
  title: string
  isView: boolean
  isEdit?: boolean
  rowData?: Game.cate
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
  coverType.value = params.rowData?.image ? '1' : '2'
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
      ElMessage.success({ message: `${drawerData.value.title}游戏成功！` })
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
