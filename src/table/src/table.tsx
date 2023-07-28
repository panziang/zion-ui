import { defineComponent, provide, ref, toRefs } from 'vue'
import { TableProps, tableProps } from './table-type'
import '../style/table.scss'
import { ColumnContext } from './column-type'

export default defineComponent({
  name: 'ZTable',
  props: tableProps,
  setup(props: TableProps, { slots }) {
    const { data } = toRefs(props)

    //获取Column组件中的列数据用于td
    const columnData = ref([])
    provide('column-data', columnData)

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
                  {columnData.value.map((column: ColumnContext) => {
                    return column.field ? <td>{row[column.field!]}</td> : null
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }
  }
})
