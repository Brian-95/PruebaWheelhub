<template>
  <div class="py-4">
    <p class="text-sm description mb-4">
      {{ $t('wizard.step1.description') }}
    </p>

    <!-- checkbox terminos -->
    <div class="form-group">
      <label class="form-checkbox">
        <input
          id="terms"
          type="checkbox"
          v-model="acceptedTerms"
        />
        <span class="text-sm">{{ $t('wizard.step1.terms') }}</span>
      </label>
    </div>

    <!-- btn next -->
    <div class="flex justify-end">
      <div class="w-32">
        <btnWzNext
          @click="handleNextStep"
          :disabled="!canProceed"
          data-test="next-button"
        >
          {{ $t('wizard.next') }}
        </btnWzNext>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWizardStore } from '@/stores/wizard'
import { storeToRefs } from 'pinia'
import btnWzNext from '@/components/common/btnWzNext.vue'

const store = useWizardStore()
const { acceptedTerms, canProceed } = storeToRefs(store)
const { nextStep } = store


//permite avanzar si los términos fueron aceptados.
const handleNextStep = (): void => {
  if (canProceed.value) {
    nextStep()
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/base' as *;

</style>