import { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { Rules } from 'async-validator'
export type Layout = 'vertical' | 'horizontal'
export type LabelSize = 'sm' | 'md' | 'lg'
export type LabelAlign = 'start' | 'center' | 'end'

export const formProps = {
  model: {
    type: Object,
    required: true
  },
  layout: {
    //枚举类型
    type: String as PropType<Layout>,
    default: 'vertical'
  },
  labelSize: {
    type: String as PropType<LabelSize>,
    default: 'md'
  },
  labelAlign: {
    type: String as PropType<LabelAlign>,
    default: 'start'
  },
  //校验规则
  rules: {
    type: Object as PropType<Rules>
  }
} as const
export type FormProps = ExtractPropTypes<typeof formProps>

//表单上下文类型，模型和校验规则
export type FormContext = {
  model: any
  rules?: Rules
}

// 泛型约束
export const formContextToken: InjectionKey<FormContext> =
  Symbol('formContextToken')
