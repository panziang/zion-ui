# Button 按钮

## 基础按钮

:::demo 基础按钮

```vue
<template>
  <z-button></z-button>
</template>
```

:::

## 按钮类型 type

:::demo 通过 type 属性设置按钮样式，可选：primary | secondary | text

```vue
<template>
  <z-button color="red"></z-button>
  <z-button type="primary"></z-button>
  <z-button type="text"></z-button>
</template>
```

:::

## 按钮尺寸 size

:::demo 通过 size 属性设置按钮样式，可选：small | medium | large
```vue
<template>
  <z-button size="small">Small</z-button>
  <z-button>Medium</z-button>
  <z-button size="large">Large</z-button>
</template>
```
:::


## 禁用按钮 disabled

:::demo 通过 disabled 属性禁用按钮
```vue
<template>
    <z-button type="primary"          
      @click="confirm">Primary</z-button>
    <z-button type="primary" disabled 
      @click="confirm">Disabled</z-button>
</template>
<script setup>
  const confirm = () => console.log('confirm')
</script>
```
:::

## 块级按钮 block

:::demo 通过 block 属性设置按钮为块级
```vue
<template>
  <z-button type="primary" block>Confirm</z-button>
  <z-button block>Cancel</z-button>
</template>
```
:::