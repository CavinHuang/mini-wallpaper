<template>
  <div class="card">
    <div class="card-title">轮播图编辑</div>
    <div class="card-subtitle">11</div>
    <ElDivider />
    <div class="edit-container">
      <FormProvider :form="form">
        <SchemaField :schema="schema" />
        <p class="help-block">若要跳转页面，请选择对应的数据或填写跳转的 URL 地址，不跳转请填写 “#” 号占位。</p>
        <ElDivider />
        <Submit @submit="log">提交</Submit>
      </FormProvider>
    </div>
  </div>
</template>

<script lang="ts" setup name="banner">
import { ElDivider } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'
import { BannerApi } from '@/api/modules'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import { Submit, FormItem, Space, Input, Select, DatePicker, ArrayItems, Upload } from '@formily/element-plus'

const router = useRouter()
const navigator = (path: string) => router.push({ path })

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Space,
    Input,
    Upload,
    Select,
    DatePicker,
    ArrayItems
  }
})

const form = createForm()
const schema = {
  type: 'object',
  properties: {
    array: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: '',
      items: {
        type: 'object',
        properties: {
          space: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              cover: {
                type: 'array',
                title: '',
                'x-decorator': 'FormItem',
                'x-component': 'Upload',
                'x-component-props': {
                  listType: 'picture-card',
                  multiple: false,
                  action: 'https://formily-vue.free.beeceptor.com/file'
                },
                required: true
              },
              space: {
                type: 'void',
                'x-component': 'Space',
                'x-component-props': {
                  style: {
                    display: 'flex',
                    flexDirection: 'column'
                  }
                },
                properties: {
                  input: {
                    type: 'string',
                    title: '输入框1',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input'
                  },
                  input2: {
                    type: 'string',
                    title: '输入框2',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input'
                  }
                }
              },
              space2: {
                type: 'void',
                'x-component': 'Space',
                'x-component-props': {
                  style: {
                    display: 'flex',
                    flexDirection: 'column'
                  }
                },
                properties: {
                  space: {
                    type: 'void',
                    'x-component': 'Space',
                    properties: {
                      up: {
                        type: 'void',
                        'x-decorator': 'FormItem',
                        'x-component': 'ArrayItems.MoveUp',
                        'x-component-props': {
                          type: 'success',
                          size: 'large'
                        }
                      },
                      down: {
                        type: 'void',
                        'x-decorator': 'FormItem',
                        'x-component': 'ArrayItems.MoveDown',
                        'x-component-props': {
                          type: 'primary',
                          size: 'large'
                        }
                      },
                      remove: {
                        type: 'void',
                        'x-decorator': 'FormItem',
                        'x-component': 'ArrayItems.Remove',
                        'x-component-props': {
                          type: 'danger',
                          size: 'large'
                        }
                      }
                    }
                  },
                  select: {
                    type: 'string',
                    title: '',
                    enum: [
                      { label: '选项1', value: 1 },
                      { label: '选项2', value: 2 }
                    ],
                    'x-decorator': 'FormItem',
                    'x-component': 'Select',
                    'x-component-props': {
                      style: {
                        width: '250px'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      properties: {
        add: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition'
        }
      }
    }
  }
}

const log = (values: any) => {
  console.log(values)
}

const positons = ref<any[]>([])
function getPositions() {
  BannerApi.getPositions().then((res) => {
    if (res.data) {
      positons.value = res.data || []
    }
  })
}
getPositions()
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-wrap: wrap;
}
.banner-position {
  height: 110px;
  width: 400px;
  display: flex;
  flex-wrap: nowrap;
  background: linear-gradient(-113deg, #c543d8, #925cc3) !important;
  line-height: 3em;
  box-shadow: 0 0 6px 1px rgb(0 0 0 / 20%);
  border-radius: 3px;
  color: #fff;
  padding: 15px 25px;
  cursor: pointer;
  .left-content {
    font-size: 18px;
    flex: 1;
    .edit-text {
      font-size: 14px;
    }
  }
  .icon-image {
    width: 60px;
    font-size: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.6;
  }
}
</style>
