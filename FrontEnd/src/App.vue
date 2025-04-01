<template>
  <div class="app-container">
    <!-- Selector de idioma global (i18n) -->
    <LanguageSelector />

    <div class="app-card">
      <WzTitle />

      <!-- Contenido de cada paso del wizard -->
      <div class="wizard-steps-wrapper">
        <transition 
          name="slide"
          mode="out-in"
        >
          <!-- Renderizado dinámico de componente por paso -->
          <div :key="currentStep" class="wizard-step-container">
            <component :is="currentComponent" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useWizardStore } from './stores/wizard'

// Componentes por paso del wizard
import wzStep1RGPD from './components/wzStep1RGPD.vue'
import wzStep2Form from './components/wzStep2Form.vue'
import wzStep3Feedback from './components/wzStep3Feedback.vue'

// Componente de selector de idioma i18n
import LanguageSelector from './components/common/LanguageSelector.vue'

import WzTitle from './components/common/wzTitle.vue'

// Acceso al estado global del wizard mediante Pinia
const store = useWizardStore()

// ref reactiva del paso actual 
const currentStep = computed(() => store.currentStep)


 //Computed que mapea el paso actual con su componente correspondiente.
const currentComponent = computed(() => {
  switch (currentStep.value) {
    case 1:
      return wzStep1RGPD
    case 2:
      return wzStep2Form
    case 3:
      return wzStep3Feedback
    default:
      return wzStep1RGPD
  }
})
</script>


<style lang="scss">
@use '@/assets/scss/main';

.wizard-steps-wrapper {
  position: relative;
  width: 100%;
  min-height: 200px;
  overflow: hidden;
}

.wizard-step-container {
  width: 100%;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>