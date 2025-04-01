import { createI18n } from 'vue-i18n'
import { es } from './locales/es'
import { en } from './locales/en'
import type { Translations } from './types'

// Detectar el idioma del navegador
const userLanguage = navigator.language.split('-')[0]
const defaultLocale = ['es', 'en'].includes(userLanguage) ? userLanguage : 'es'

export const i18n = createI18n<[Translations], 'es' | 'en'>({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    es,
    en
  }
}) 