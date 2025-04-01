import { mount } from '@vue/test-utils'
import wzStep1RGPD from '@/components/wzStep1RGPD.vue'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from './i18n'
import { useWizardStore } from '@/stores/wizard'

describe('wzStep1RGPD.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(wzStep1RGPD, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn
          }),
          i18n
        ]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('muestra el checkbox de aceptación', () => {
    const wrapper = mount(wzStep1RGPD, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn
          }),
          i18n
        ]
      }
    })
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('el botón siguiente está deshabilitado cuando no se aceptan los términos', () => {
    const wrapper = mount(wzStep1RGPD, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn
          }),
          i18n
        ]
      }
    })
    const nextButton = wrapper.findComponent({ name: 'btnWzNext' })
    expect(nextButton.exists()).toBe(true)
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('el botón siguiente está habilitado cuando se aceptan los términos', async () => {
    const wrapper = mount(wzStep1RGPD, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn
          }),
          i18n
        ]
      }
    })
    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)
    const nextButton = wrapper.findComponent({ name: 'btnWzNext' })
    expect(nextButton.exists()).toBe(true)
    expect(nextButton.attributes('disabled')).toBeUndefined()
  })

  it('llama a nextStep() al hacer click en siguiente si canProceed es true', async () => {
    const wrapper = mount(wzStep1RGPD, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn,
            initialState: {
              wizard: {
                acceptedTerms: true
              }
            }
          }),
          i18n
        ]
      }
    })

    const store = useWizardStore()

    const nextButton = wrapper.findComponent({ name: 'btnWzNext' })
    expect(nextButton.exists()).toBe(true)
    await nextButton.trigger('click')
    expect(store.nextStep).toHaveBeenCalled()
  })

  it('marca el checkbox como checked si acceptedTerms es true', () => {
    const wrapper = mount(wzStep1RGPD, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn,
            initialState: {
              wizard: {
                acceptedTerms: true
              }
            }
          }),
          i18n
        ]
      }
    })

    const store = useWizardStore()
    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.element.checked).toBe(true)
  })
})
