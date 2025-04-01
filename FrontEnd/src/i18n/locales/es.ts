import type { Translations } from '../types'

export const es: Translations = {
  wizard: {
    next: 'Siguiente',
    back: 'Atrás',
    welcome: 'Test FrontEnd Wheel Hub',
    step1: {
      title: 'Paso 1',
      description: 'Este asistente te guiará a través del proceso de creación de tu cuenta.',
      terms: 'Confirmo que soy mayor de edad y acepto el tratamiento de mis datos según la política de protección de datos vigente.'
    },
    step2: {
      title: 'Crea tu usuario',
      username: 'Usuario',
      password: 'Contraseña',
      repeatPassword: 'Repetir contraseña',
      hint: 'Pista de contraseña',
      hintOptional: '(opcional)',
      passwordStrength: {
        weak: 'Débil',
        medium: 'Media',
        strong: 'Fuerte',
        veryStrong: 'Muy fuerte'
      },
      validation: {
        required: 'El campo es obligatorio',
        usernameRequired: 'El usuario es obligatorio',
        passwordRequired: 'La contraseña es obligatoria',
        passwordMinLength: 'La contraseña debe tener al menos 8 caracteres',
        passwordMaxLength: 'La contraseña no puede tener más de 24 caracteres',
        passwordNumber: 'La contraseña debe contener al menos un número',
        passwordUppercase: 'La contraseña debe contener al menos una mayúscula',
        passwordConfirmRequired: 'Debe repetir la contraseña',
        passwordsNotMatch: 'Las contraseñas no coinciden',
        hintMaxLength: 'La pista no puede tener más de 60 caracteres'
      }
    },
    step3: {
      title: 'La cuenta se creó correctamente!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
      backToStart: 'Volver al inicio'
    }
  }
} 