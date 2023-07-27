<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test'
import ZBaseModal from './base-modal/src/base-modal'
import VirtualList from './components/VirtualList.vue'
import ZPopover from './popover/src/popover'
import { ref } from 'vue'

// const modalVisible = ref(false)
// const open = () => {
//   modalVisible.value = true
// }
const visible = ref(false)
const host = ref()
const open = () => {
  visible.value = !visible.value
}
</script>

<template>
  <div id="app">
    <!-- <HelloWorld />
    <VirtualList></VirtualList> -->
    <!-- <Test>
      <template #default>qwe default</template>
      <template #title>
        <h2>title</h2>
      </template>
    </Test> -->
    <!-- <z-button type="primary" disabled @click="confirm"></z-button> -->
    <!-- <z-button type="primary" size="small" block @click="confirm"></z-button>
    <z-button type="primary" size="medium" disabled @click="confirm"></z-button>
    <z-button type="primary" size="large"></z-button> -->
    <!-- <button @click="open">打开</button>
    <ZBaseModal v-model="modalVisible">
      <div
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
        "
      >
        <img src="./assets/sheep.webp" />
      </div>
    </ZBaseModal> -->

    <!-- <ZButton>取消</ZButton> -->
    <button ref="host" @click="open">host</button>
    <ZPopover v-model="visible" :host="host" title="qwer" show-arrow
      >123</ZPopover
    >
  </div>
</template>

<style scoped>
#app {
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center;
  flex-wrap: wrap; */
  text-align: center;
}
</style>
