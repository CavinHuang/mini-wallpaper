<template>
  <FormLayout :labelCol="6" :wrapperCol="18" :form="form">
    <SchemaField :schema="schema" />
  </FormLayout>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import {
  FormLayout,
  FormItem,
  Cascader,
  Input,
  Checkbox,
  Radio,
  Select,
  ArrayItems,
  Space,
  InputNumber
} from '@formily/element-plus'
import type { ISchema } from '@formily/vue'
import { createSchemaField } from '@formily/vue'
import { SelectIcon } from '@/components/Formily/SelectIcon'
import { FormTree } from '../Formily/Tree'
import Upload from '../Formily/upload'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    Radio,
    Select,
    Cascader,
    SelectIcon,
    FormTree,
    ArrayItems,
    Space,
    Checkbox,
    Upload,
    InputNumber
  }
})
defineProps<{
  schema: ISchema
}>()

const form = createForm()
</script>

<style lang="scss" scoped></style>
