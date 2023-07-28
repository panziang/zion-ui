# 按钮 -Button

:::demo 这是Table组件

``` vue
<template>
  <z-table :data="tableData">
    <z-column field="date" header="Date" />
    <z-column field="name" header="Name" />
    <z-column field="address" header="Address" />

  </z-table>
</template>

<script setup>
import { ref } from 'vue';
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Mark',
    address: 'No. 189, Grove St, Los Angeles',
    checked: true
  },
  {
    date: '2016-05-03',
    name: 'Mark',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Mark',
    address: 'No. 189, Grove St, Los Angeles'
  }
])

</script>


```
:::
