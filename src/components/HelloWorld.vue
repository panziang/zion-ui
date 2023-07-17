<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="card">
    <button @click="count++">count is {{ count }}</button>
  </div>
  <h1 class="text-3xl font-bold underline">giao</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
