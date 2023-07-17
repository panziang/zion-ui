<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test'
</script>

<template>
  <HelloWorld />
  <Test @click="onclick">
    <template #default>qwe default</template>
    <template #title>
      <h2>title</h2>
    </template>
  </Test>
</template>

<style scoped></style>
