import { App } from 'vue'
import Table from './src/table'
import Column from './src/column'

// 具名导出
export { Table, Column }

// 导出插件
export default {
  install(app: App) {
    app.component(Table.name, Table)
    app.component(Column.name, Column)
  }
}
