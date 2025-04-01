<template>
  <div class="language-selector">
    <button
      @click="toggleDropdown"
      class="language-button"
    >
      <span>{{ currentLanguageLabel }}</span>
      <span class="mdi mdi-chevron-down" :class="{ 'rotate': isOpen }"></span>
    </button>

    <div
      v-if="isOpen"
      class="language-dropdown"
    >
      <div class="language-options" role="menu">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="language-option"
          :class="{ 'active': lang.code === i18n.locale.value }"
        >
          {{ lang.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const isOpen = ref(false)

const languages = [
  { code: 'es', label: 'Castellano' },
  { code: 'en', label: 'English' }
]

const currentLanguageLabel = computed(() => {
  return languages.find(lang => lang.code === i18n.locale.value)?.label
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const changeLanguage = (code: string) => {
  i18n.locale.value = code
  isOpen.value = false
  localStorage.setItem('preferredLanguage', code)
}

const handleClickOutside = (event: MouseEvent) => {
  if (isOpen.value && !(event.target as HTMLElement).closest('.language-selector')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  const savedLanguage = localStorage.getItem('preferredLanguage')
  if (savedLanguage && ['es', 'en'].includes(savedLanguage)) {
    i18n.locale.value = savedLanguage as 'es' | 'en'
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/assets/scss/base' as *;

.language-selector {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 50;
  width: 180px;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: $white;
  border: 2px solid $green-color;
  border-radius: 0.75rem;
  color: $green-color;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  width: 100%;
  justify-content: space-between;
  box-shadow: 0 2px 8px $green-color;

  .mdi {
    transition: transform 0.3s ease;
    font-size: 1.2rem;
    
    &.rotate {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background-color: $green-color;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px $green-color;
  }

  &:active {
    transform: translateY(0);
  }
}

.language-dropdown {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 20px rgba($black, 0.15);
  border: 2px solid $green-color;
  overflow: hidden;
  animation: dropdownFadeIn 0.2s ease;
}

.language-options {
  display: flex;
  flex-direction: column;
}

.language-option {
  padding: 0.75rem 1.25rem;
  text-align: left;
  color: $text-color;
  transition: all 0.2s ease;
  font-size: 1.1rem;
  font-weight: 500;
  width: 100%;
  background: transparent;
  border: none;
  
  &:hover {
    background-color: rgba($green-color, 0.1);
    color: $green-color;
  }

  &.active {
    background-color: $green-color;
    color: white;
  }

  & + .language-option {
    border-top: 1px solid rgba($green-color, 0.1);
  }
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 