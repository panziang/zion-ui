//入口文件
//引入实现组件批量导出
import type { App } from 'vue'
import ButtonPlugin, { Button } from '../src/button'

//导出组件
export { Button }

//插件列表
const installs = [ButtonPlugin]
//导出插件
export default {
  install(app: App) {
    //批量循环导出插件
    installs.forEach(p => app.use(p))
  }
}
