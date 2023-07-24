import { ExtractPropTypes, PropType } from 'vue'

export type Layout = 'vertical' | 'horizontal'

export const formProps = {
  model: {
    type: Object,
    required: true
  },
  layout: {
    //枚举类型
    type: String as PropType<Layout>,
    default: 'vertical'
  }
} as const
export type FormProps = ExtractPropTypes<typeof formProps>
