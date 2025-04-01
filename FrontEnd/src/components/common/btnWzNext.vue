<template>
  <button type="button" @click="onClick" :disabled="disabled" :class="[
    'flex justify-center items-center w-full px-6 py-3 rounded-lg font-medium text-base transition-all duration-200',
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-primary-dark hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md disabled:hover:transform-none disabled:hover:shadow-none'
      : 'bg-secondary text-text hover:bg-secondary-hover transition-colors',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const onClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>