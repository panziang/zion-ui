//需要node执行，所以是js文件
const path = require('path')
const fs = require('fs-extra')
const { defineConfig, build } = require('vite')

const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const fsExtra = require('fs-extra')
const version = require('../package.json').version
// 基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})
// 入口文件
const entryFile = path.resolve(__dirname, './entry.ts')
// 组件目录
const componentsDir = path.resolve(__dirname, '../src')
// 输出目录
const outputDir = path.resolve(__dirname, '../build')

// rollup配置
const rollupOptions = {
  // 外置
  external: ['vue', 'vue-router'],
  output: {
    exports: 'named',
    globals: {
      vue: 'Vue'
    }
  }
}

// 生成package.json
const createPackageJson = name => {
  // 预设
  const fileStr = `{
    "name": "${name ? name : 'zion-ui'}",
    "version": "${version}",
    "main": "${name ? 'index.umd.js' : 'zion-ui.umd.js'}",
    "module": "${name ? 'index.umd.js' : 'zion-ui.mjs'}",
    "author": "duck不必",
    "description": "一个从0到1构建的组件库"
  }`

  if (name) {
    // 单个组件，输出对应的package.json
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8'
    )
  } else {
    // 全量
    fsExtra.outputFile(
      path.resolve(outputDir, 'package.json'),
      fileStr,
      'utf-8'
    )
  }
}

// 单组件按需构建
const buildSingle = async name => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(componentsDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd']
        },
        outDir: path.resolve(outputDir, name)
      }
    })
  )

  createPackageJson(name)
}

//执行创建
// 全量构建
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: 'zion-ui-vite',
          fileName: 'zion-ui-vite',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )

  // 生成package.json
  createPackageJson()
}

const buildLib = async () => {
  await buildAll()

  // 按需打包
  fs.readdirSync(componentsDir)
    .filter(name => {
      // 只要目录不要文件，且里面包含index.ts
      const componentDir = path.resolve(componentsDir, name)
      const isDir = fs.lstatSync(componentDir).isDirectory()
      return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    .forEach(async name => {
      await buildSingle(name)
    })
}

buildLib()
