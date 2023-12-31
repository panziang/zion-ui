# Modal 对话框

## 基础功能
:::demo 
```vue
<template>
  <z-button @click="open">打开</z-button>

  <z-modal v-model="visible" title="小贴士" center align-center>
    <span>这是一条消息！</span>
    <template #footer>
      <div class="dialog-footer">
        <z-button style="margin-right: 12px;" @click="visible = false">取消</z-button>
        <z-button type="primary" @click="visible = false">确定</z-button>
      </div>
    </template>
  </z-modal>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)

    const open = () => {
      visible.value = true;
    }

    return {
      visible,
      open,
    }
  }
})
</script>

<style>
.dialog-footer {
  padding: 20px;
  text-align: right;
}
</style>
```
:::

## 自定义内容
通过插槽可以自定义Modal内容。我们有title、default和footer三个插槽可以使用。
:::demo 
```vue
<template>
  <z-button @click="open">打开</z-button>

  <z-modal v-model="visible" title="Shipping address" width="50%" align-center>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2016-05-02</td>
          <td>John Smith</td>
          <td>No.1518, Jinshajiang Road, Putuo District</td>
        </tr>
        <tr>
          <td>2016-05-04</td>
          <td>John Smith</td>
          <td>No.1518, Jinshajiang Road, Putuo District</td>
        </tr>
        <tr>
          <td>2016-05-01</td>
          <td>John Smith</td>
          <td>No.1518, Jinshajiang Road, Putuo District</td>
        </tr>
        <tr>
          <td>2016-05-03</td>
          <td>John Smith</td>
          <td>No.1518, Jinshajiang Road, Putuo District</td>
        </tr>
      </tbody>
    </table>
  </z-modal>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)

    const open = () => {
      visible.value = true;
    }

    return {
      visible,
      open,
    }
  }
})
</script>
```
:::

## 自定义头部
可以通过header插槽定义头部内容。
:::demo 通过header插槽定义头部，上下文中有close方法用于关闭Modal
```vue
<template>
  <z-button @click="open">打开</z-button>

  <z-modal v-model="visible" :show-close="false">
    <template #header="{ close }">
      <div class="my-header">
        <h4>This is a custom header!</h4>
        <z-button type="text" @click="close">
          Close
        </z-button>
      </div>
    </template>
    This is dialog content.
  </z-modal>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
    const open = () => {
      visible.value = true;
    }

    return {
      visible,
      open,
    }
  }
})
</script>

<style>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  margin-right: 16px;
  word-break: break-all;
}
</style>
```
:::

## 自定义对话框的背景色

:::demo 
```vue
<template>
  <z-button @click="open">打开</z-button>

  <z-modal v-model="visible" title="小贴士" center backgroundColor="#D6B679">
    <span>这是一条消息！</span>
    <template #footer>
      <div class="dialog-footer">
        <z-button style="margin-right: 12px;" @click="visible = false">取消</z-button>
        <z-button type="primary" @click="visible = false">确定</z-button>
      </div>
    </template>
  </z-modal>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)

    const open = () => {
      visible.value = true;
    }

    return {
      visible,
      open,
    }
  }
})
</script>

<style>
.dialog-footer {
  padding: 20px;
  text-align: right;
}
</style>
```
:::