<template>
  <div class="py-8 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
    <div class="flex flex-col items-center text-center">
      <div class="mb-8">
        <div class="success-icon mb-4">
          <i class="mdi mdi-check-circle text-6xl text-custom-green-dark"></i>
        </div>
        <h3 class="text-xl font-medium leading-6 mb-4 title">
          {{ $t('wizard.step3.title') }}
        </h3>
        <p class="text-gray-600">
          {{ $t('wizard.step3.description') }}
        </p>
      </div>
    </div>

    <div class="pt-4 flex items-center justify-between">
      <div class="w-32">
        <btnWzBack @click="previousStep" />
      </div>
      <div class="w-64">
        <btnWzNext
          @click="goToStart"
          variant="primary"
        >
          {{ $t('wizard.step3.backToStart') }}
        </btnWzNext>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWizardStore } from '../stores/wizard'
import btnWzNext from './common/btnWzNext.vue'
import btnWzBack from './common/btnWzBack.vue'

const wizardStore = useWizardStore()
const { previousStep } = wizardStore

const goToStart = () => {
  wizardStore.resetForm()
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/base.scss' as *;

.title {
  color: $text-color;
}

.success-icon {
  color: $green-color;
}
</style> 