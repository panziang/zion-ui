// import Theme from 'vitepress/dist/client/theme-default'
import Theme from 'vitepress/theme'
import HelloWorld from '../../../src/components/HelloWorld.vue'
import Test from '../../../src/components/Test'

// 主题样式
// import 'vitepress-theme-demoblock/theme/styles/index.css'
// 插件的组件，主要是demo组件

import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue';
import Demo from 'vitepress-theme-demoblock/components/Demo.vue';


export default {
  ...Theme,
  //扩展应用程序实例
  enhanceApp({ app }) {
    //注册组件
    //SFC组件
    app.component('HelloWorld', HelloWorld)
    //JSX组件
    app.component('Test', Test)
    app.component('DemoBlock',DemoBlock)
    app.component('Demo',Demo)

    
  }
}