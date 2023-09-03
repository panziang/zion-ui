# 表格 -Table

:::demo 这是Table组件

``` vue
<template>
  <z-table :data="tableData" @selection-change="onSelectionChange">
    <z-column type="selection"/>
    <z-column field="date" header="Date" />
    <z-column field="name" header="Name" />
    <z-column field="address" header="Address" />
    <z-column  header="操作" >
      <template #default="row">
        <button @click=editRow(row)>编辑</button>
        <button>删除</button>
      </template>

    </z-column>

  </z-table>
</template>

<script setup>
import { ref } from 'vue';
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Mark1',
    address: 'No. 189, Grove St, Los Angeles',
    checked: true
  },
  {
    date: '2016-05-03',
    name: 'Mark2',
    address: 'No. 189, Grove St, Los Angeles',
    checked: true
  },
  {
    date: '2016-05-03',
    name: 'Mark3',
    address: 'No. 189, Grove St, Los Angeles'
  }
])

const editRow = (row) => {
  console.log('editRow', row)
}

const onSelectionChange = (checkedRows) => {
  console.log('checkedRows', checkedRows)
}

</script>


```
:::
