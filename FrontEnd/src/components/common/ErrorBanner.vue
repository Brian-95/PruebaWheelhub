<template>
  <Transition name="slide-up">
    <div v-if="show" class="error-banner">
      <i class="mdi mdi-alert-circle"></i>
      {{ message }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  message: string | null
}>()

const show = ref(false)

watch(() => props.message, (newMessage) => {
  if (newMessage) {
    show.value = true
    setTimeout(() => {
      show.value = false
    }, 5000)
  } else {
    show.value = false
  }
})
</script>

<style lang="scss" scoped>
.error-banner {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ef4444;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 50;
  animation: slideUp 0.3s ease-out;

  i {
    font-size: 20px;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(-50%, 100%);
  opacity: 0;
}

@keyframes slideUp {
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}
</style> 