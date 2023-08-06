import { App } from 'vue'
import Button from './src/Button'

//具名导出
export { Button }

export default {
  install(app: App) {
    app.component(Button.name, Button)
  }
}
