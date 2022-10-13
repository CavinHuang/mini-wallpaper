import { useQiNIu } from '@/hooks'
import { reactive, computed } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { schemaRequest } from '@/utils/schemaUpload'

export function genSchema() {
  const schema = reactive({
    appid: {
      type: 'string',
      title: '所属小程序',
      required: true,
      enum: [] as any,
      'x-decorator': 'FormItem',
      'x-component': 'Select'
    },
    tags: {
      type: 'array',
      title: '关联标签',
      required: true,
      enum: [] as any,
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox.Group',
      'x-component-props': {
        size: 'small',
        border: true
      }
    },
    categories: {
      type: 'string',
      title: '所属分类',
      required: true,
      enum: [] as any,
      'x-decorator': 'FormItem',
      'x-component': 'Select'
    },
    name: {
      type: 'string',
      title: '名称',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input'
    },
    info: {
      type: 'string',
      title: '说明',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea'
    },
    price: {
      type: 'string',
      title: '价格',
      default: '0',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input'
    },
    vip_price: {
      type: 'string',
      title: 'VIP价格',
      default: '0',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input'
    },
    urlType: {
      type: 'boolean',
      title: '',
      required: true,
      default: 1,
      enum: [
        {
          label: '上传图片',
          value: 1
        },
        {
          label: '填写地址',
          value: 2
        }
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group'
    },
    cover: {
      type: 'array',
      title: '上传资源',
      'x-decorator': 'FormItem',
      'x-component': 'Upload',
      'x-component-props': {
        multiple: true,
        httpRequest: schemaRequest,
        'list-type': 'picture'
      },
      required: true,
      'x-reactions': [
        {
          dependencies: ['.urlType'],
          fulfill: {
            state: {
              visible: '{{$deps[0] === 1}}'
            }
          }
        }
      ]
    },
    cover2: {
      type: 'string',
      title: '地址',
      default: 'http://',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '输入地址，多个用换行符分割，例如：\r\n http://xxx \r\n http://xxx'
      },
      'x-reactions': [
        {
          dependencies: ['.urlType'],
          fulfill: {
            state: {
              visible: '{{$deps[0] === 2}}'
            }
          }
        }
      ]
    },
    sort: {
      type: 'string',
      title: '排序',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber'
    }
  })

  function setMiniprograms(options: Options[]) {
    schema.appid.enum = options
  }
  function setTags(options: Options[]) {
    schema.tags.enum = options
  }
  function setCategories(options: Options[]) {
    schema.categories.enum = options
  }
  return {
    schema,
    setMiniprograms,
    setTags,
    setCategories
  }
}
