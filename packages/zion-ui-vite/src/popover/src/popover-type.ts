import { ExtractPropTypes, PropType } from 'vue'
import { Placement } from '@floating-ui/dom'

export const popoverProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  host: {
    type: Object as PropType<HTMLElement>,
    default: () => null
  },
  title: {
    type: String,
    default: ''
  },
  showArrow: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom'
  }
} as const
export type PopoverProps = ExtractPropTypes<typeof popoverProps>
