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

export const FormTree = observer(
  defineComponent({
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
        type: Function as PropType<(keys: unknown[]) => void>,
        require: true
      }
    },
    setup(customeProps, { attrs, emit, slots }) {
      console.log(customeProps, attrs, slots)
      const onCheck = (item: unknown, keys: any) => {
        console.log(keys, item)
        if (customeProps.onChange) customeProps.onChange([1, 3])
      }
      const fieldRef = useField()
      return () => {
        const field = fieldRef.value as any
        console.log(field)
        return h(
          ElTree,
          {
            props: {
              ...customeProps,
              ...attrs,
              defaultExpandedKeys: field.value || []
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
)

// export const FormTree = connect(
//   FormTreeInner,
//   mapProps({
//     loading: true
//   })
// )
