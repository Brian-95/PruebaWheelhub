import { mount } from '@vue/test-utils'
import wzStep3Feedback from '@/components/wzStep3Feedback.vue'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from './i18n'
import { useWizardStore } from '@/stores/wizard'

describe('wzStep3Feedback.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(wzStep3Feedback, {
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
    expect(wrapper.find('.success-icon').exists()).toBe(true)
    expect(wrapper.find('.title').exists()).toBe(true)
  })

  it('muestra los botones de navegación', () => {
    const wrapper = mount(wzStep3Feedback, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn
          }),
          i18n
        ]
      }
    })
    expect(wrapper.findComponent({ name: 'btnWzBack' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'btnWzNext' }).exists()).toBe(true)
  })

  it('llama a resetForm() al hacer click en "Volver al inicio"', async () => {
    const wrapper = mount(wzStep3Feedback, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn,
            stubActions: false
          }),
          i18n
        ]
      }
    })

    const store = useWizardStore()

    const resetButton = wrapper.findComponent({ name: 'btnWzNext' })
    expect(resetButton.exists()).toBe(true)
    await resetButton.trigger('click')
    expect(store.resetForm).toHaveBeenCalled()
  })

  it('llama a previousStep() al hacer click en el botón atrás', async () => {
    const wrapper = mount(wzStep3Feedback, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn,
            stubActions: false
          }),
          i18n
        ]
      }
    })

    const store = useWizardStore()

    const backButton = wrapper.findComponent({ name: 'btnWzBack' })
    expect(backButton.exists()).toBe(true)
    await backButton.trigger('click')
    expect(store.previousStep).toHaveBeenCalled()
  })
}) 