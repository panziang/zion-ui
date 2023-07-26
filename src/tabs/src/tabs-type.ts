import { ExtractPropTypes, PropType } from 'vue'

export const tabsProps = {
  modelValue: {
    type: String,
    default: ''
  }
} as const
export type TabsProps = ExtractPropTypes<typeof tabsProps>
