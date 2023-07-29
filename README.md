# Zion-UI组件库


<p align="center">
<img src="https://img.shields.io/npm/v/zion-ui-vite?color=c95f8b&amp;label=" alt="NPM version">
<a href="https://github.com/panziang/zion-ui/actions/workflows/main.yml"><img src="https://github.com/panziang/zion-ui/actions/workflows/main.yml/badge.svg?branch=main" alt="CI" style="max-width: 100%;"></a>
<img src="https://img.shields.io/github/license/panziang/zion-ui"/>
<img src="https://img.shields.io/codecov/c/github/panziang/zion-ui"/>
</p>

## Features

- ⚡️ Vue 3, Vite 3, pnpm, ESBuild - born with fastness
- 🦾 TypeScript, of course
- 🗂 File based routing
- ⚙️ Unit Testing with Vitest
- 😃 Eslint + Prettier
- 🎨 UnoCSS - the instant on-demand atomic CSS engine
- 🌍 I18n ready
- 🚘 CI/CD with GithubActions


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

## Browser Support

Modern browsers and Internet Explorer 10+.


## LICENSE

[MIT](LICENSE)


Copyright (c) 2023 - present Ziang(Zion) Pan