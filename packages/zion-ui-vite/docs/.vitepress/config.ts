import { defineConfig } from 'vitepress'
// import { demoBlockPlugin } from 'vitepress-theme-demoblock'
const sidebar = {
  '/': [
    {
      text: '快速开始',
      collapsible: true,
      collapsed: true,
      items: [{ text: '安装', link: '/guide/install' }]
    },
    {
      text: '通用',
      collapsible: true,
      collapsed: false,
      items: [
        { text: 'Button 按钮', link: '/components/button/' },
        { text: 'Icon 图标', link: '/components/icon/' }
      ]
    },
    {
      text: '导航',
      collapsible: true,
      collapsed: false,
      items: [
        { text: 'Pagination 分页', link: '/components/pagination/' },
        { text: 'Tabs 标签页', link: '/components/tabs/' }
      ]
    },
    {
      text: '反馈',
      collapsible: true,
      collapsed: false,
      items: [
        { text: 'Modal 对话框', link: '/components/modal/' },
        { text: 'Popover 气泡卡片', link: '/components/popover/' }
      ]
    },
    {
      text: '数据录入',
      collapsible: true,
      collapsed: false,
      items: [
        { text: 'Input 输入框', link: '/components/input/' },
        { text: 'Form 表单', link: '/components/form/' }
      ]
    },
    {
      text: '数据展示',
      collapsible: true,
      collapsed: false,
      items: [
        { text: 'Tree 树', link: '/components/tree/' },
        { text: 'Table 表格', link: '/components/table/' }
      ]
    },
    {
      text: '布局',
      collapsible: true,
      collapsed: false,
      items: []
    }
  ]
}

export default defineConfig({
  title: 'Zion UI', //站点标题
  description: '一个vue3组件库',
  lang: 'cn-ZH',
  themeConfig: {
    sidebar,
    nav: [],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/panziang/zion-ui' }
    ]
  },
  markdown: {
    config: md => {
      // 这里可以使用markdown-it插件
      const { demoBlockPlugin } = require('vitepress-theme-demoblock')
      md.use(demoBlockPlugin)
    }
  }
})
