import { Ref, defineComponent, inject, toRefs } from 'vue'
import { ColumnContext, ColumnProps, columnProps } from './column-type'

export default defineComponent({
  name: 'ZColumn',
  props: columnProps,
  setup(props: ColumnProps) {
    const { field, header, type } = toRefs(props)
    //将列数据传给table组件
    const columnData = inject<Ref<ColumnContext[]>>('column-data')
    columnData!.value.push({
      field: field.value,
      header: header.value
    })

    return () => <th>{header.value}</th>
  }
})
