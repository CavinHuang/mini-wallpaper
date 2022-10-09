<template>
  <div></div>
</template>
<script lang="jsx">
import { defineComponent, computed } from 'vue'
import { FormDrawer } from '@formily/element-plus'
import FormDrawerItem from './FormDrawerItem.vue'
import { nextTick, ref } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  props: {
    schema: Object,
    success: Function,
    initialValues: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, { expose }) {
    // drawer框状态
    const drawerVisible = ref(false)
    const drawerData = ref({
      isView: false,
      title: '',
      isEdit: false
    })

    const schema = computed(() => ({
      type: 'object',
      properties: props.schema
    }))

    const coverType = ref('1')

    // 接收父组件传过来的参数
    const acceptParams = (params) => {
      drawerData.value = params
      coverType.value = params.rowData?.image ? '1' : '2'
      drawerVisible.value = true
    }

    const handleOpen = (dataCallback) => {
      const instance = FormDrawer(props.title, () => <FormDrawerItem schema={schema.value} />)
      nextTick(() => {
        instance
          .open({
            initialValues: props.initialValues || drawerData.value.rowData
          })
          .then(async (values) => {
            try {
              if (!drawerData.value.apiUrl) return
              if (dataCallback) {
                values = dataCallback(values)
              }
              await drawerData.value.apiUrl(values)
              ElMessage.success({ message: `${drawerData.value.title}游戏成功！` })
              drawerData.value.getTableList && drawerData.value.getTableList()
              drawerVisible.value = false
            } catch (error) {
              console.error(error)
            }
            props.success && props.success(values)
          })
          .catch((e) => {
            console.log(e)
          })
      })
    }

    expose({
      handleOpen,
      acceptParams
    })
  }
})
</script>

<style lang="scss" scoped></style>
