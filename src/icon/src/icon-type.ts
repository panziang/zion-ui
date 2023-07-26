import { ExtractPropTypes, PropType } from 'vue'

export const iconProps = {
  name: {
    type: String,
    default: ''
  },
  //fonticon的前缀
  prefix: {
    type: String,
    default: 'icon'
  },
  //图标尺寸
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 'inherit'
  },
  color: {
    type: String,
    default: 'inherit'
  },
  component: {
    type: String,
    default: null
  }
} as const
export type IconProps = ExtractPropTypes<typeof iconProps>
