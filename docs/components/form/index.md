# 表单 Form

## 基础用法

传入 model 属性设置数据模型。

:::demo 传入 model 属性设置数据模型
```vue
<template>
  <z-form :model="model" layout="horizontal">
    <z-form-item label="用户名">
      <input/>
      <!-- <z-input v-model="model.user"/> -->
    </z-form-item>
  </z-form>
   {{model}}
</template>
<script setup>
  import {ref} from 'vue'
  const model = ref({
    user: 'tom'
  })
</script>
```
:::

## 水平/垂直排列
设置layout属性可以设置标签和控件的排列方式为垂直方向。
:::demo layout默认为horizontal，即水平方向排列
```vue
<template>
  <p>
    <span>layout:</span>
    <label>
      <input type="radio" value="vertical" v-model="layout"/>
      vertical
    </label>
    <label>
      <input type="radio" value="horizontal" v-model="layout"/>
      horizontal
    </label>
  </p>
  <z-form :model="model" :layout="layout">
    <z-form-item label="用户名：">
      <!-- <s-input v-model="model.user"/> -->
      <input v-model="model.user"/>
    </z-form-item>
  </z-form>
</template>
<script setup>
import {ref} from 'vue'
const layout = ref('vertical')
const model = ref({
    user: 'tom'
  })
</script>
```
:::