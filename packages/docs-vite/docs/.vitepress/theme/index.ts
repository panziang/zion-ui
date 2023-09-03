import Theme from "vitepress/theme";
import "../../../../zion-ui-vite/src/index.scss";

import ZionUI from "../../../../zion-ui-vite/scripts/entry";

// 主题样式
// import 'vitepress-theme-demoblock/theme/styles/index.css'
// 插件的组件，主要是demo组件

import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";

// 引入字体图标css
import "./iconfont.css";
// import './iconfont.js'
export default {
  ...Theme,
  //扩展应用程序实例
  enhanceApp({ app }) {
    //注册组件
    //SFC组件
    app.use(ZionUI);
    //JSX组件

    app.component("Demo", Demo);
    app.component("DemoBlock", DemoBlock);
  },
};
