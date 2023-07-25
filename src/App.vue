<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test'
import ZBaseModal from './base-modal/src/base-modal'
import VirtualList from './components/VirtualList.vue'
import { ref } from 'vue'

const modalVisible = ref(false)
const open = () => {
  modalVisible.value = true
}
</script>

<template>
  <div id="app">
    <HelloWorld />
    <VirtualList></VirtualList>
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
    <button @click="open">打开</button>
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
    </ZBaseModal>

    <!-- <ZButton>取消</ZButton> -->
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
