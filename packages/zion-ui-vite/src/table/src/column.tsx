import { Ref, defineComponent, inject, nextTick, ref, toRefs, watch } from 'vue'
import { ColumnContext, ColumnProps, columnProps } from './column-type'
import '../style/table.scss'

export default defineComponent({
  name: 'ZColumn',
  props: columnProps,
  setup(props: ColumnProps) {
    const { field, header, type } = toRefs(props)
    //将列数据传给table组件
    const columnData = inject<Ref<ColumnContext[]>>('column-data')
    columnData!.value.push({
      field: field.value,
      header: header.value,
      type: type.value
    })

    //定义一个响应式的变量，值来自父组件，来控制全选
    const allChecked = inject<Ref<boolean>>('all-checked')
    //定义一个半选状态
    const isIndeterminate = inject<Ref<boolean>>('is-indeterminate')
    const checkboxRef = ref()

    // 初始化时设置一次半选状态
    nextTick(() => {
      if (checkboxRef.value) {
        checkboxRef.value.indeterminate = isIndeterminate!.value
      }
    })
    //监听半选状态
    watch(
      isIndeterminate!,
      () => {
        if (!checkboxRef.value) {
          return
        } else {
          checkboxRef.value.indeterminate = isIndeterminate!.value
        }
      },
      { immediate: true }
    )

    return () => (
      <th>
        {type.value === 'selection' ? (
          <input
            type="checkbox"
            ref={checkboxRef}
            v-model={allChecked!.value}
          />
        ) : (
          header.value
        )}
      </th>
    )
  }
})
