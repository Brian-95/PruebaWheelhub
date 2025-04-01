import { createTestingPinia } from '@pinia/testing'
import { i18n } from './i18n'

export const plugins = [
  createTestingPinia({
    createSpy: jest.fn
  }),
  i18n
]