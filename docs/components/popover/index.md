# Popover 气泡卡片

## 基础用法

:::demo
```vue
<template>
<div>
    <button ref="host" @click="open">host</button>
    <z-popover v-model="visible" :host="host" title="qwer" show-arrow placement="bottom"
      >123</z-popover
    >
    </div>
</template>
<script setup>
import { ref } from 'vue'
const visible = ref(false)
const host = ref()
const open = () => {
  visible.value = !visible.value
}
</script>
```
:::