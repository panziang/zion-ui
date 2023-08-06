import { defineComponent, provide, ref, toRefs, watch } from 'vue'
import { TableProps, tableProps } from './table-type'
import '../style/table.scss'
import { ColumnContext } from './column-type'

export default defineComponent({
  name: 'ZTable',
  props: tableProps,
  emits: ['selection-change'],
  setup(props: TableProps, { slots, emit }) {
    const { data } = toRefs(props)

    //获取Column组件中的列数据用于td
    const columnData = ref([])
    provide('column-data', columnData)

    //check变化事件处理
    watch(
      data,
      (newData: any) => {
        const checkedRows = newData.filter((row: any) => row.checked)
        if (checkedRows.length === data.value.length) {
          //全选
          allChecked.value = true
          isIndeterminate.value = false
        } else if (checkedRows.length === 0) {
          //全不选
          allChecked.value = false
          isIndeterminate.value = false
        } else {
          //半选
          isIndeterminate.value = true
        }
        emit('selection-change', checkedRows)
      },
      //深度监听
      { deep: true }
    )

    //提供给column的全选状态值
    const allChecked = ref(data.value.every((row: any) => row.checked))
    provide('all-checked', allChecked)
    watch(allChecked, newVal => {
      data.value.forEach((row: any) => {
        row.checked = newVal
      })
    })

    //半选状态值
    //有值被选中且不是全选
    const isIndeterminate = ref(
      data.value.some((row: any) => row.checked && !allChecked.value)
    )
    provide('is-indeterminate', isIndeterminate)

    return () => {
      return (
        <table class="s-table">
          <thead>
            <tr>{slots.default?.()}</tr>
          </thead>
          <tbody>
            {data.value.map((row: any) => {
              return (
                <tr>
                  {columnData.value.map(
                    (column: ColumnContext, index: number) => {
                      // 如果存在默认插槽，优先渲染
                      const columnSlots = slots.default?.()[index]
                      if (columnSlots?.children) {
                        return (
                          <td>
                            {(columnSlots?.children as any).default?.(row)}
                          </td>
                        )
                      }
                      //没有插槽
                      return column.field ? (
                        <td>{row[column.field]}</td>
                      ) : column.type === 'selection' ? (
                        <input type="checkbox" v-model={row.checked} />
                      ) : (
                        ''
                      )
                    }
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }
  }
})
