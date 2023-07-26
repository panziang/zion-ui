# Tabs 标签页

## 基础用法

z-tabs包裹若干s-tab即可，设置`v-model`控制激活页签id
:::demo
```vue
<template>
  <z-tabs v-model="activeTab">
    <z-tab id="tab1" title="Tab1">Tab1 Content</z-tab>
    <z-tab id="tab2" title="Tab2">Tab2 Content</z-tab>
    <z-tab id="tab3" title="Tab3">Tab3 Content</z-tab>
  </z-tabs>
</template>
<script setup>
import { ref } from 'vue'
const activeTab = ref('tab1')
</script>
<style>
.vp-doc li + li {
  margin-top: 0;
}
</style>
```
:::

## 关闭、新增标签
添加closable和addable课关闭、新增标签。
:::demo 添加closable和addable课关闭、新增标签。
```vue
<template>
  <z-tabs v-model="activeTab" closable addable>
    <z-tab id="tab1" title="Tab1">Tab1 Content</z-tab>
    <z-tab id="tab2" title="Tab2">Tab2 Content</z-tab>
    <z-tab id="tab3" title="Tab3">Tab3 Content</z-tab>
  </z-tabs>
</template>
<script setup>
import { ref } from 'vue'
const activeTab = ref('tab1')
</script>
```
:::