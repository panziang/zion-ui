import Theme from 'vitepress/theme'
import '../../../src/index.scss'
import HelloWorld from '../../../src/components/HelloWorld.vue'
import Test from '../../../src/components/Test'
import Tree from '../../../src/tree/src/tree'
import Button from '../../../src/button/src/Button'

// 主题样式
// import 'vitepress-theme-demoblock/theme/styles/index.css'
// 插件的组件，主要是demo组件

// import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
// import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'

export default {
  ...Theme,
  //扩展应用程序实例
  enhanceApp({ app }) {
    //注册组件
    //SFC组件
    app.component('HelloWorld', HelloWorld)
    //JSX组件
    app.component('Test', Test)
    app.component('ZButton', Button)
    app.component('ZTree', Tree)
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  }
}
