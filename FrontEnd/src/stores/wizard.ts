import { defineStore } from 'pinia'

// Interface principal para los datos del formulario multistep
export interface FormData {
  username: string
  password: string
  passwordConfirm: string
  hint: string
}

// Estado completo del wizard, incluye control de pasos y aceptación de términos
export interface WizardState {
  currentStep: number
  maxSteps: number
  formData: FormData
  acceptedTerms: boolean
}

export const useWizardStore = defineStore('wizard', {
  state: (): WizardState => ({
    currentStep: 1,
    maxSteps: 3,
    formData: {
      username: '',
      password: '',
      passwordConfirm: '',
      hint: ''
    },
    acceptedTerms: false
  }),

  getters: {
    /**
     * Indica si se puede avanzar al siguiente paso.
     * Se define por paso y sus respectivas reglas de validación.
     */
    canProceed: (state): boolean => {
      switch (state.currentStep) {
        case 1:
          // Paso 1: se deben aceptar los términos
          return state.acceptedTerms

        case 2:
          // Paso 2: validación básica de usuario y password
          return (
            state.formData.username.trim().length > 0 &&
            state.formData.password.length >= 8 &&
            state.formData.password === state.formData.passwordConfirm
          )

        case 3:
          // Paso 3: no tiene validaciones, siempre se puede finalizar
          return true

        default:
          return false
      }
    }
  },

  actions: {
    /**
     * Avanza al siguiente paso si es válido y no es el último.
     * Se apoya en la propiedad computada `canProceed`.
     */
    nextStep() {
      if (this.canProceed && this.currentStep < this.maxSteps) {
        this.currentStep++
      }
    },

    /**
     * Retrocede un paso si no está en el primero.
     */
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },

    /**
     * Reinicia el wizard al paso 1, limpia el formulario y los términos.
     * Puede usarse tras completar o cancelar el flujo.
     */
    resetForm() {
      this.currentStep = 1
      this.acceptedTerms = false
      this.formData = {
        username: '',
        password: '',
        passwordConfirm: '',
        hint: ''
      }
    }
  }
})
