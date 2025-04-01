<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <div
        v-for="level in 4"
        :key="level"
        class="h-1 flex-1 rounded-full"
        :class="getStrengthClass(level)"
      ></div>
    </div>
    <p class="text-sm" :class="getTextClass">{{ strengthText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  strength: number
}

const props = defineProps<Props>()

const strengthText = computed(() => {
  switch (props.strength) {
    case 0:
      return 'Muy débil'
    case 1:
      return 'Débil'
    case 2:
      return 'Media'
    case 3:
      return 'Fuerte'
    case 4:
      return 'Muy fuerte'
    default:
      return ''
  }
})

const getTextClass = computed(() => {
  switch (props.strength) {
    case 0:
    case 1:
      return 'text-strength-weak'
    case 2:
      return 'text-strength-medium'
    case 3:
    case 4:
      return 'text-strength-strong'
    default:
      return ''
  }
})

const getStrengthClass = (level: number) => {
  if (level <= props.strength) {
    switch (props.strength) {
      case 1:
        return 'bg-strength-weak'
      case 2:
        return 'bg-strength-medium'
      case 3:
      case 4:
        return 'bg-strength-strong'
      default:
        return 'bg-strength-weak'
    }
  }
  return 'bg-strength-empty'
}
</script>

<style lang="scss">
@use '@/assets/scss/base.scss' as base;

.bg-strength-empty {
  background-color: base.$color-strength-empty;
}

.bg-strength-weak {
  background-color: base.$color-strength-weak;
}

.bg-strength-medium {
  background-color: base.$color-strength-medium;
}

.bg-strength-strong {
  background-color: base.$color-strength-strong;
}

.text-strength-weak {
  color: base.$color-strength-weak;
}

.text-strength-medium {
  color: base.$color-strength-medium;
}

.text-strength-strong {
  color: base.$color-strength-strong;
}
</style> 