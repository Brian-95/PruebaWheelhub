/// <reference types="jest" />
/// <reference types="@vue/test-utils" />

declare module '@vue/test-utils' {
  import { ComponentPublicInstance } from 'vue'
  export interface MountingOptions<T> {
    global?: {
      plugins?: any[]
    }
  }
  export function mount<T extends ComponentPublicInstance>(
    component: any,
    options?: MountingOptions<T>
  ): any
}

declare module 'vue-i18n' {
  export * from 'vue-i18n'
}

declare module 'jest' {
  export * from 'jest'
} 