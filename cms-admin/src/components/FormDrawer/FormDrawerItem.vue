<template>
  <FormLayout :labelCol="6" :wrapperCol="18">
    <SchemaField :schema="schema" />
  </FormLayout>
</template>

<script lang="ts" setup>
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
</script>

<style lang="scss" scoped></style>
