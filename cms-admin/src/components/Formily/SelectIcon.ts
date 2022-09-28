import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '@formily/element-plus'

import SelectIconVue from '../SelectIcon/index.vue'
import { transformComponent } from '@formily/element-plus/lib/__builtins__'

export type SelectIconProps = typeof SelectIconVue

const TransformSelectIcon = transformComponent<SelectIconProps>(SelectIconVue, {
  change: 'update:iconValue'
})

export const SelectIcon = connect(
  TransformSelectIcon,
  mapProps({ value: 'iconValue', readOnly: 'readonly' }),
  mapReadPretty(PreviewText.select)
)
