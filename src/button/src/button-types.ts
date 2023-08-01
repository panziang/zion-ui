import { ExtractPropTypes, PropType } from 'vue'

export type IButtonType =
  | 'primary'
  | 'secondary'
  | 'text'
  | 'success'
  | 'danger'
export type IButtonSize = 'large' | 'medium' | 'small'

export const buttonProps = {
  type: {
    //类型约束
    type: String as PropType<IButtonType>,
    default: 'secondary'
  },
  size: {
    type: String as PropType<IButtonSize>,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
