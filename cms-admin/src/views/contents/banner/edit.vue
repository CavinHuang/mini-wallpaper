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
import { ElDivider, ElIcon } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { BannerApi } from '@/api/modules'
import { ref, computed, onMounted, defineComponent, h, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, useField } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { Submit, FormItem, Space, Input, Select, DatePicker, ArrayItems, Upload } from '@formily/element-plus'
import { GlobalStore } from '@/store'
import { CommonApi } from '../../../api/modules/common'

const router = useRouter()
const globalStore = GlobalStore()
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
const uploadUrl = computed(() => globalStore.getAppData('qiniuUploadUrl')?.value)
const uploadPath = computed(() => globalStore.getAppData('qiniuBannerPath')?.value)
const qiniuHttpHost = computed(() => globalStore.getAppData('qiniuHttpHost')?.value)
const form = createForm()
const getKey = (): string => {
  const randmKey = new Date().getTime() + Math.ceil(Math.random() * 30)
  return uploadPath.value ? String(uploadPath.value + randmKey) : String(randmKey)
}

const imageUrl = ref<string[]>([])
const images = ref<Record<number, string>>({})
const key = ref(getKey())

const pictureComponent = () =>
  observer(
    defineComponent({
      name: 'PictureComponet',
      setup() {
        const fieldRef = useField() as any
        return {
          fieldRef
        }
      },
      render() {
        let imageUrl = ''
        if (this.fieldRef.value.length && this.fieldRef.value[0].response) {
          imageUrl = qiniuHttpHost.value + '/' + this.fieldRef.value[0].response.key
        }
        return imageUrl
          ? h('img', { src: imageUrl, class: 'banner-image' })
          : h(
              ElIcon,
              { class: 'banner-uploader-icon' },
              {
                default: () => h(Plus)
              }
            )
      }
    })
  )
const token = ref('')
const onSuccess = () => {
  key.value = getKey()
}

const schema = computed(() => {
  return {
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
                    // listType: 'picture-card',
                    class: 'banner-uploader',
                    multiple: false,
                    action: uploadUrl.value,
                    showFileList: false,
                    data: {
                      key: key.value,
                      token: token.value
                    },
                    onSuccess
                  },
                  'x-content': {
                    default: pictureComponent()
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
                      title: '标题',
                      require: true,
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                      'x-decorator-props': {
                        style: {
                          'padding-left': '10px'
                        }
                      },
                      'x-component-props': {
                        style: {
                          width: '300px'
                        }
                      }
                    },
                    input2: {
                      type: 'string',
                      title: '链接',
                      require: true,
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                      'x-component-props': {
                        style: {
                          width: '300px'
                        }
                      },
                      'x-reactions': {
                        // dependencies: ['.input'],
                        // fulfill: {
                        //   state: {
                        //     value: '{{$deps[0]}}'
                        //   }
                        // }
                      }
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
                      'x-component-props': {
                        style: {
                          paddingLeft: '10px'
                        }
                      },
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
                    linkType: {
                      type: 'string',
                      title: '',
                      enum: [
                        { label: '#-不跳转', value: '#' },
                        { label: 'LK-自定义链接', value: 'LK' }
                      ],
                      'x-decorator': 'FormItem',
                      'x-component': 'Select',
                      'x-component-props': {
                        style: {
                          width: '198px'
                        }
                      },
                      'x-reactions': {
                        fulfill: {
                          run: `{{$form.setFieldState("array.0.space.space.input2",state=>{state.value = (() => {
                            switch ($self.value) {
                              case '#':
                                return '#'
                              case 'LK':
                                return 'http://'
                            
                              default:
                                return '#'
                            }
                          })()})}}`
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
            title: '添加',
            'x-component': 'ArrayItems.Addition'
          }
        }
      }
    }
  }
})

function getQiniuToken() {
  CommonApi.qiniuToken().then((res) => {
    if (res.data) {
      token.value = res.data
    }
  })
}

onMounted(() => {
  getQiniuToken()
})

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
  :deep() {
    // 表单
    .formily-element-plus-form-item-feedback-layout-loose {
      margin-bottom: 10px;
    }
    .el-upload.el-upload--picture-card {
      width: 90px;
      height: 90px;
      svg {
        margin-top: 0 !important;
      }
    }
    .banner-uploader {
      width: 90px;
      height: 90px;
      .banner-image {
        width: 90px;
        height: 90px;
        display: block;
      }
      .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
        &:hover {
          border-color: var(--el-color-primary);
        }
      }
    }

    .el-icon.banner-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 90px;
      height: 90px;
      text-align: center;
    }
  }
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
