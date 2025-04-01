<template>
  <div class="w-full">
    <div class="progress-container">
      <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progress: number
}

defineProps<Props>()
</script>

<style lang="scss">
@use '@/assets/scss/base.scss' as base;

.progress-container {
  width: 100%;
  height: 8px;
  background-color: base.$color-progress-bg;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: base.$color-progress-fill;
  transition: width 0.3s ease-in-out;
}
</style> 