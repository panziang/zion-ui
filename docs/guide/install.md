# 安装 Zion UI

## Install

```bash
npm i zion-ui-vite
```

## Quick Start

```js
import Vue from 'vue'
import ZionUI from 'zion-ui-vite'

const App = {
    template: `
        <ZButton/>
    `,
};

createApp(App)
    .use(ZionUI)
    .mount("#app");
```