<template>
  <div class="flex flex-col items-center">
    <!-- logo and Title -->
    <div class="logo-container">
      <img 
        src="@/assets/img/Logotipo-Vertical-Verde-Alta.png" 
        alt="Wheel Hub Logo"
      />
      <h2 class="title">
        {{ $t('wizard.welcome') }}
      </h2>
    </div>

    <!-- progress bar -->
    <div class="w-full mb-6">
      <progressBar :progress="(currentStep / maxSteps) * 100" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWizardStore } from '@/stores/wizard'
import { storeToRefs } from 'pinia'
import progressBar from './progressBar.vue'

const store = useWizardStore()
const { currentStep } = storeToRefs(store)
const maxSteps = 3
</script>

<style lang="scss" scoped>
@use '@/assets/scss/base';
@use '@/assets/scss/components/logo';

h2 {
  color: base.$text-color;
}
</style> 