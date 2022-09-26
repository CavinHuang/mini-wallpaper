<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerData.title}配置分类`">
    <el-tabs v-model="drawerData.rowData!.type" class="demo-tabs" @tab-click="onchangeTab">
      <el-tab-pane label="文本框" name="0"></el-tab-pane>
      <el-tab-pane label="多行文本框" name="1"></el-tab-pane>
      <el-tab-pane label="单选框" name="2"></el-tab-pane>
      <el-tab-pane label="文件上传" name="3"></el-tab-pane>
      <el-tab-pane label="多选框" name="4"></el-tab-pane>
      <el-tab-pane label="下拉框" name="5"></el-tab-pane>
    </el-tabs>
    <el-form ref="ruleFormRef" :rules="rules" :disabled="drawerData.isView" :model="drawerData.rowData" label-width="140px">
      <el-form-item label="分类" prop="config_tab_id" clearable>
        <el-select v-model="drawerData.rowData!.config_tab_id" placeholder="请选择分类" clearable>
          <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="input_type" clearable v-if="drawerData.rowData!.type === '0'">
        <el-select v-model="drawerData.rowData!.input_type" placeholder="请选择分类" clearable>
          <el-option v-for="item in textType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="配置名称" prop="name" clearable>
        <el-input v-model="drawerData.rowData!.name" placeholder="请填写分类名称"></el-input>
      </el-form-item>
      <el-form-item label="字段变量" prop="menu_name" clearable>
        <el-input v-model="drawerData.rowData!.menu_name" placeholder="例如：site_url"></el-input>
      </el-form-item>
      <el-form-item label="配置简介" prop="desc" clearable>
        <el-input v-model="drawerData.rowData!.desc" placeholder="请填写desc"></el-input>
      </el-form-item>
      <InputGroup :row-data="drawerData.rowData" v-if="drawerData.rowData!.type === '0'" />
      <TextareaGroup :row-data="drawerData.rowData" v-if="drawerData.rowData!.type === '1'" />
      <RadioGroup :row-data="drawerData.rowData" v-if="drawerData.rowData!.type === '2'" />
      <UploadGroup :row-data="drawerData.rowData" v-if="drawerData.rowData!.type === '3'" />
      <CheckboxGroup :row-data="drawerData.rowData" v-if="drawerData.rowData!.type === '4'" />
      <SelectGroup :row-data="drawerData.rowData" v-if="drawerData.rowData!.type === '5'" />
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
import { ref, reactive, watch } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { System } from '@/api/interface/system'
import { SystemApi } from '@/api/modules'
import InputGroup from './tabs/InputGroup.vue'
import TextareaGroup from './tabs/TextareaGroup.vue'
import RadioGroup from './tabs/RadioGroup.vue'
import UploadGroup from './tabs/UploadGroup.vue'
import CheckboxGroup from './tabs/CheckboxGroup.vue'
import SelectGroup from './tabs/SelectGroup.vue'

const rules = reactive({
  pid: [{ required: true, message: '请选择父级分类', trigger: 'change' }],
  title: [{ required: true, message: '请填写分类名称', trigger: 'blur' }],
  eng_title: [{ required: true, message: '请填写分类字段英文', trigger: 'blur' }],
  type: [{ required: true, message: '请选择分类', trigger: 'change' }]
})

const textType = [
  { value: 'input', label: '文本框' },
  { value: 'dateTime', label: '时间' },
  { value: 'color', label: '颜色' },
  { value: 'number', label: '数字' }
]

const inputType: Record<number, string> = {
  0: 'text',
  1: 'textarea',
  2: 'radio',
  3: 'upload',
  4: 'checkbox',
  5: 'select'
}

interface DrawerProps {
  title: string
  isView: boolean
  rowData?: System.SystemConfigItem
  apiUrl?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

const onchangeTab = (tab: any) => {
  drawerData.value.rowData!.type = tab.index as string
  drawerData.value.rowData!.input_type = inputType[tab.index as number]
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
