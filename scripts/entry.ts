//入口文件
//引入实现组件批量导出
import type { App } from 'vue'
import ButtonPlugin, { Button } from '../src/button'
import TreePlugin, { Tree } from '../src/tree'
import PaginationPlugin, { Pagination } from '../src/pagination'
import FormPlugin, { Form } from '../src/form'

//导出组件
export { Button, Tree, Pagination, Form }

//插件列表
const installs = [ButtonPlugin, TreePlugin, PaginationPlugin, FormPlugin]
//导出插件
export default {
  install(app: App): void {
    //批量循环导出插件
    installs.forEach(p => app.use(p))
  }
}
