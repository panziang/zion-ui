<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test'
import ZButton from './button/src/Button'
</script>

<template>
  <div id="app">
    <HelloWorld />
    <Test>
      <template #default>qwe default</template>
      <template #title>
        <h2>title</h2>
      </template>
    </Test>
    <z-button type="primary"></z-button>
    <ZButton>取消</ZButton>
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
