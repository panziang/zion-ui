#  图标 Icon

## 基础用法

:::demo
```vue
<template>
    <z-icon name="react" />
    <z-icon name="https://vitejs.cn/logo.svg" :size="30" />
</template>
```
:::

## 尺寸

设置 size 可以设置图标尺寸 
:::demo 设置 size 可以设置图标尺寸
```vue
<template>
  <z-icon name="vue" size="30px" />
  <z-icon name="vue" :size="20" />
  <z-icon name="vue" :size="10" />
</template>
```
:::

## 颜色

设置 color 可以设置图标颜色 
:::demo 设置为合法的颜色字符串即可
```vue
<template>
  <z-icon name="vuejs" size="30px" color="green" />
  <z-icon name="react" :size="30" color="blue" />
  <z-icon name="angular" :size="30" color="red" />
</template>
```
:::

## svg 图标
设置component可以显示svg图标。
:::demo component设置为symbolId即可
```vue
<template>
  <z-icon component="vuejs" size="30px" color="green" />
  <z-icon component="react" :size="30" color="blue" />
  <z-icon component="angular" :size="30" color="red" />
</template>
```
:::
