import { ExtractPropTypes, PropType } from 'vue'

export type IButtonType = 'primary' | 'secondary' | 'text'
export const buttonProps = {
  type: {
    //类型约束
    type: String as PropType<IButtonType>,
    default: 'secondary'
  }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
