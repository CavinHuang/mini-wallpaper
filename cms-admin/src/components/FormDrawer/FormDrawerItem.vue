<template>
  <FormLayout :labelCol="6" :wrapperCol="18" :form="form">
    <SchemaField :schema="schema" />
  </FormLayout>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormLayout, FormItem, Input, Radio, Select } from '@formily/element-plus'
import type { ISchema } from '@formily/vue'
import { createSchemaField } from '@formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    Radio,
    Select
  }
})
defineProps<{
  schema: ISchema
}>()

const form = createForm()
</script>

<style lang="scss" scoped></style>
