import { ExtractPropTypes, PropType } from 'vue'

export const columnProps = {
  field: {
    type: String,
    default: ''
  },
  header: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  }
} as const
export type ColumnProps = ExtractPropTypes<typeof columnProps>

export interface ColumnContext {
  field?: string
  header?: string
  type?: string
}
