<template>
    <button type="button" @click="onClick" class="flex justify-center items-center w-full px-6 py-3 rounded-lg font-medium text-base transition-all duration-200
    text-custom-green-dark hover:text-white border border-custom-green-dark hover:bg-custom-green-dark focus:ring-4 focus:outline-none focus:ring-green-300">
        <slot>{{ $t('wizard.back') }}</slot>
    </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'click'): void
}>()

const onClick = () => {
    emit('click')
}
</script>