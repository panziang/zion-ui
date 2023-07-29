import { defineConfig } from 'vitepress'
// import { demoBlockPlugin } from 'vitepress-theme-demoblock'
const sidebar = {
  '/': [
    { text: '快速开始', link: '/', items: [] },
    {
      text: '通用',
      items: [
        { text: 'Button 按钮', link: '/components/button/' },
        { text: 'Icon 图标', link: '/components/icon/' }
      ]
    },
    {
      text: '导航',
      items: [
        { text: 'Pagination 分页', link: '/components/pagination/' },
        { text: 'Tabs 标签页', link: '/components/tabs/' }
      ]
    },
    {
      text: '反馈',
      items: [
        { text: 'Modal 对话框', link: '/components/modal/' },
        { text: 'Popover 气泡卡片', link: '/components/popover/' }
      ]
    },
    {
      text: '数据录入',
      items: [
        { text: 'Input 输入框', link: '/components/input/' },
        { text: 'Form 表单', link: '/components/form/' }
      ]
    },
    {
      text: '数据展示',
      items: [
        { text: 'Tree 树', link: '/components/tree/' },
        { text: 'Table 表格', link: '/components/table/' }
      ]
    },
    {
      text: '布局',
      items: [{ text: 'Space 间距', link: '/components/space/' }]
    }
  ]
}

export default defineConfig({
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
