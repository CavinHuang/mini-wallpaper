import { ElTree } from 'element-plus'
import { transformComponent } from '@formily/element-plus/lib/__builtins__'
import { connect, h, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '@formily/element-plus'
import { defineComponent } from 'vue'

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
    }
  },
  setup(props, { attrs, emit, slots }) {
    console.log(attrs, slots)

    const onCheckChange = (...args: any[]) => {
      console.log(args)
    }
    return () => {
      return h(
        ElTree,
        {
          data: props.data,
          onCheckChange
        },
        slots
      )
    }
  }
})

export const FormTree = connect(
  FormTreeInner,
  mapProps({
    loading: true
  })
)
