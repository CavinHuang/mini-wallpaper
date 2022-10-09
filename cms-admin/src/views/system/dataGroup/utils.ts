import { SystemGroupData } from '@/api/modules'
import { reactive } from 'vue'

/**
 * 
 {
    label: '文本框',
    value: 'input'
  },
  {
    label: '多行文本框',
    value: 'textarea'
  },
  {
    label: '单选框',
    value: 'radio'
  },
  {
    label: '多选框',
    value: 'checkbox'
  },
  {
    label: '下拉选择',
    value: 'select'
  },
  {
    label: '单图',
    value: 'upload'
  },
  {
    label: '多图',
    value: 'uploads'
  }
 */
export function genSchema(fields: SystemGroupData.SystemGroupFileds[]) {
  const schema = reactive({}) as any
  const componentsMap = {
    input: 'Input',
    textarea: 'Input.Textarea',
    radio: 'Radio',
    checkbox: 'Checkbox',
    select: 'Select',
    upload: 'Upload',
    uploads: 'Upload'
  }

  fields.forEach((field) => {
    const type = field.type as keyof typeof componentsMap
    const component: string = componentsMap[type] || 'Input'
    schema[field.title] = {
      type: 'string',
      title: field.name,
      required: true,
      'x-decorator': 'FormItem',
      'x-component': component
    }

    if (type === 'radio' || type === 'checkbox' || type === 'select') {
      schema[field.name].enum = parseFieldParms(field.params)
    }
  })

  schema.sort = {
    type: 'string',
    title: '排序',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'InputNumber',
    'x-component-props': {
      style: {
        width: '240px'
      }
    }
  }

  return schema
}

function parseFieldParms(params: string) {
  const paramsArr = params.replace('\r\n', '\n').split('\n')
  const info = [] as any[]
  paramsArr.forEach((item, index) => {
    const temp = item.split('=>')
    if (temp.length === 2) {
      info[index]['value'] = temp[0]
      info[index]['label'] = temp[1]
    }
  })
  return info
}
