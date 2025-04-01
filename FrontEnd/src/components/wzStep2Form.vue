<template>
  <div class="py-8 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
    <div class="flex flex-col">
      <h3 class="text-lg font-medium leading-6 mb-4 title">
        {{ $t('wizard.step2.title') }}
      </h3>

      <!-- username input -->
      <div class="mb-4">
        <label class="block text-sm font-medium form-label">
          {{ $t('wizard.step2.username') }}
        </label>
        <input type="text" v-model="formData.username" @blur="touchField('username')" :class="[
          'form-input mt-1 block w-full rounded-md sm:text-sm border-2 transition-colors duration-200',
          touched.username && errors.username ? 'border-red-500 focus:border-red-500' : 'border-secondary focus:border-primary'
        ]" />
        <p v-if="touched.username && errors.username" class="mt-1 text-sm text-red-500">{{ errors.username }}</p>
      </div>

      <!-- password and confirm password -->
      <div class="flex flex-col md:flex-row md:gap-4">
        <!-- password  -->
        <div class="flex-1 mb-4 md:mb-0">
          <label class="block text-sm font-medium form-label">
            {{ $t('wizard.step2.password') }}
          </label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" v-model="formData.password" @blur="touchField('password')"
              maxlength="24" :class="[
                'form-input mt-1 block w-full rounded-md sm:text-sm border-2 transition-colors duration-200',
                touched.password && errors.password ? 'border-red-500 focus:border-red-500' : 'border-secondary focus:border-primary'
              ]" />
            <button type="button" @click="showPassword = !showPassword"
              class="eye-button absolute inset-y-0 right-0 pr-3 flex items-center">
              <i class="mdi" :class="showPassword ? 'mdi-eye-off' : 'mdi-eye'"></i>
            </button>
          </div>
          <p v-if="touched.password && errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
          <!-- password strength indicator -->
          <div class="mt-1">
            <div class="strength-bar h-1 w-full rounded">
              <div class="h-1 rounded transition-all duration-300" :class="passwordStrengthClass"
                :style="{ width: `${passwordStrength}%` }"></div>
            </div>
            <div class="text-xs mt-1 strength-text">
              {{ $t(`wizard.step2.passwordStrength.${passwordStrengthText}`) }}
            </div>
          </div>
        </div>

        <!-- confirm password  -->
        <div class="flex-1">
          <label class="block text-sm font-medium form-label">
            {{ $t('wizard.step2.repeatPassword') }}
          </label>
          <div class="relative">
            <input :type="showConfirmPassword ? 'text' : 'password'" v-model="formData.passwordConfirm"
              @blur="touchField('passwordConfirm')" maxlength="24" :class="[
                'form-input mt-1 block w-full rounded-md sm:text-sm border-2 transition-colors duration-200',
                touched.passwordConfirm && errors.passwordConfirm ? 'border-red-500 focus:border-red-500' : 'border-secondary focus:border-primary'
              ]" />
            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
              class="eye-button absolute inset-y-0 right-0 pr-3 flex items-center">
              <i class="mdi" :class="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"></i>
            </button>
          </div>
          <p v-if="touched.passwordConfirm && errors.passwordConfirm" class="mt-1 text-sm text-red-500">{{
            errors.passwordConfirm }}</p>
        </div>
      </div>

      <!-- password hint -->
      <div class="mb-4">
        <label class="block text-sm font-medium form-label">
          {{ $t('wizard.step2.hint') }}
          <span class="hint-optional">{{ $t('wizard.step2.hintOptional') }}</span>
        </label>
        <textarea v-model="formData.hint" maxlength="60" @blur="touchField('hint')" rows="1" :class="[
          'form-input mt-1 block w-full rounded-md sm:text-sm border-2 transition-colors duration-200 resize-none overflow-hidden',
          touched.hint && errors.hint ? 'border-red-500 focus:border-red-500' : 'border-secondary focus:border-primary'
        ]" @input="autoResize($event.target)"></textarea>
        <div class="flex justify-between items-center mt-1">
          <p v-if="touched.hint && errors.hint" class="text-sm text-red-500">{{ errors.hint }}</p>
          <div class="text-xs text-right hint-counter">
            {{ formData.hint.length }}/60
          </div>
        </div>
      </div>
    </div>

    <div class="pt-4 flex items-center justify-between">
      <div class="w-32">
        <btnWzBack @click="previousStep" />
      </div>
      <div class="w-32">
        <ErrorBanner :message="backendError" />
        <btnWzNext @click="handleNextStep" :disabled="!canProceed || hasErrors">
          {{ $t('wizard.next') }}
        </btnWzNext>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWizardStore } from '../stores/wizard'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import btnWzNext from './common/btnWzNext.vue'
import btnWzBack from './common/btnWzBack.vue'
import ErrorBanner from './common/ErrorBanner.vue'
import axios from "axios";

const { t } = useI18n()
const wizardStore = useWizardStore()
const { formData, canProceed } = storeToRefs(wizardStore)
const { nextStep, previousStep } = wizardStore

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const isSubmitting = ref(false);
const backendError = ref<string | null>(null);

// estado de campos tocados, para validar solo los que fueron tocados por el usuario
const touched = ref({
  username: false,
  password: false,
  passwordConfirm: false,
  hint: false
})

// marca un campo como tocado (con blur)
const touchField = (field: keyof typeof touched.value) => {
  touched.value[field] = true
}

// rules de validación
const errors = computed(() => {
  const errors: Record<string, string> = {}

  // username 
  if (!formData.value.username) {
    errors.username = t('wizard.step2.validation.usernameRequired')
  }

  // password 
  if (!formData.value.password) {
    errors.password = t('wizard.step2.validation.passwordRequired')
  } else {
    if (formData.value.password.length < 8) {
      errors.password = t('wizard.step2.validation.passwordMinLength')
    } else if (formData.value.password.length > 24) {
      errors.password = t('wizard.step2.validation.passwordMaxLength')
    } else if (!/\d/.test(formData.value.password)) {
      errors.password = t('wizard.step2.validation.passwordNumber')
    } else if (!/[A-Z]/.test(formData.value.password)) {
      errors.password = t('wizard.step2.validation.passwordUppercase')
    }
  }

  // password confirmation
  if (!formData.value.passwordConfirm) {
    errors.passwordConfirm = t('wizard.step2.validation.passwordConfirmRequired')
  } else if (formData.value.password !== formData.value.passwordConfirm) {
    errors.passwordConfirm = t('wizard.step2.validation.passwordsNotMatch')
  }

  // hint  
  if (formData.value.hint && formData.value.hint.length > 60) {
    errors.hint = t('wizard.step2.validation.hintMaxLength')
  }

  return errors
})

// solo considerar errores campos que han sido tocados
const hasErrors = computed(() => {
  return Object.keys(errors.value).some(field => touched.value[field as keyof typeof touched.value])
})

// calculo de la fortaleza de la contraseña
const passwordStrength = computed(() => {
  const password = formData.value.password
  let strength = 0

  if (password.length >= 8) strength += 25
  if (/[A-Z]/.test(password)) strength += 25
  if (/[0-9]/.test(password)) strength += 25
  if (/[^A-Za-z0-9]/.test(password)) strength += 25

  return strength
})

// clase de fortaleza de la contraseña
const passwordStrengthClass = computed(() => {
  if (passwordStrength.value <= 25) return 'strength-weak'
  if (passwordStrength.value <= 50) return 'strength-medium'
  if (passwordStrength.value <= 75) return 'strength-strong'
  return 'strength-very-strong'
})

// texto de fortaleza de la contraseña
const passwordStrengthText = computed(() => {
  if (passwordStrength.value <= 25) return 'weak'
  if (passwordStrength.value <= 50) return 'medium'
  if (passwordStrength.value <= 75) return 'strong'
  return 'veryStrong'
})

// llamada al backend y avanzar al siguiente paso
const handleNextStep = async () => {
  Object.keys(touched.value).forEach(field => {
    touched.value[field as keyof typeof touched.value] = true;
  });

  backendError.value = null;

  if (canProceed.value && !hasErrors.value) {
    isSubmitting.value = true;

    try {
      const response = await axios.post("http://localhost:8080/create", {
        username: formData.value.username,
        password: formData.value.password
      });

      if (response.status === 200) {
        nextStep(); 
      } else {
        backendError.value = "Error inesperado del servidor.";
        setTimeout(() => {
          backendError.value = null;
        }, 5000);
      }
    } catch (error: any) {
      backendError.value = error.response?.data?.message || "Error al conectar con el servidor.";
      setTimeout(() => {
        backendError.value = null;
      }, 5000);
    } finally {
      isSubmitting.value = false;
    }
  }
};

// ajustar el tamaño del textarea
const autoResize = (element: EventTarget | null) => {
  if (element instanceof HTMLTextAreaElement) {
    element.style.height = 'auto'
    element.style.height = element.scrollHeight + 'px'
  }
}
</script>

<style lang="scss">
@use '@/assets/scss/base' as *;

.loader {
  border: 2px solid #ccc;
  border-top: 2px solid #333;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>