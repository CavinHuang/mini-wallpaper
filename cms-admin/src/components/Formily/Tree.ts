import { ElTree } from 'element-plus'
import { transformComponent } from '@formily/element-plus/lib/__builtins__'
import { connect, h, mapProps, mapReadPretty, useField } from '@formily/vue'
import { PreviewText } from '@formily/element-plus'
import { defineComponent, PropType } from 'vue'
import { observer } from '@formily/reactive-vue'
export type TreeProps = typeof ElTree

// const TransformElTree = transformComponent<TreeProps>(ElTree, {
//   change: 'check-change'
// })

// export const FormTree = connect(TransformElTree, mapProps({ value: 'data' }), mapReadPretty(PreviewText.input))

export const FormTreeInner = defineComponent({
  name: 'FormTree',
  inheritAttrs: false,
  props: {
    data: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object as PropType<Omit<Omit<TreeProps, 'props'>, 'props'>>
    },
    onChange: {
      type: Function as PropType<(keys: unknown) => void>,
      require: true
    },
    defaultExpandedKeys: {
      type: Array
    }
  },
  emits: ['input'],
  setup(customeProps, { attrs, emit, slots }) {
    const onCheck = (item: unknown, keys: any) => {
      if (customeProps.onChange) {
        customeProps.onChange(keys.checkedKeys)
      }
    }
    return () => {
      return h(
        ElTree,
        {
          props: {
            ...attrs,
            ...{ ...customeProps, onChange: undefined },
            defaultExpandedKeys: customeProps.defaultExpandedKeys
          },
          on: {
            check: onCheck
          }
        },
        slots
      )
    }
  }
})

export const FormTree = connect(
  FormTreeInner,
  mapProps({
    dataSource: 'data',
    value: 'defaultExpandedKeys',
    loading: true
  })
)
