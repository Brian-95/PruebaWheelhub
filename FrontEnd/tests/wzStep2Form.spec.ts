import { mount } from '@vue/test-utils'
import wzStep2Form from '@/components/wzStep2Form.vue'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from './i18n'
import { useWizardStore } from '@/stores/wizard'
import axios from 'axios'

// Mock de axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('wzStep2Form.vue', () => {
  beforeEach(() => {
    // Resetear todos los mocks antes de cada prueba
    jest.clearAllMocks()
    
    // Configurar el mock de axios para devolver una respuesta exitosa
    mockedAxios.post.mockResolvedValue({ status: 200 })
  })

  it('se renderiza correctamente', () => {
    const wrapper = mount(wzStep2Form, {
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

  it('muestra los campos del formulario', () => {
    const wrapper = mount(wzStep2Form, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn
          }),
          i18n
        ]
      }
    })
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('llama a nextStep() al hacer click en el botón siguiente', async () => {
    const wrapper = mount(wzStep2Form, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn,
            stubActions: false,
            initialState: {
              wizard: {
                currentStep: 2,
                formData: {
                  username: 'testuser',
                  password: 'TestPass123',
                  passwordConfirm: 'TestPass123',
                  hint: 'test hint'
                }
              }
            }
          }),
          i18n
        ]
      }
    })

    const store = useWizardStore()

    // Marcar todos los campos como tocados
    await wrapper.find('input[type="text"]').trigger('blur')
    await wrapper.find('input[type="password"]').trigger('blur')
    await wrapper.findAll('input[type="password"]')[1].trigger('blur')
    await wrapper.find('textarea').trigger('blur')

  
    await wrapper.find('input[type="text"]').setValue('testuser')
    await wrapper.find('input[type="password"]').setValue('TestPass123')
    await wrapper.findAll('input[type="password"]')[1].setValue('TestPass123')
    await wrapper.find('textarea').setValue('test hint')

    const nextButton = wrapper.findComponent({ name: 'btnWzNext' })
    expect(nextButton.exists()).toBe(true)
    expect(nextButton.attributes('disabled')).toBeUndefined()
    await nextButton.trigger('click')

    // Esperar a que se resuelva la llamada a la API
    await wrapper.vm.$nextTick()

    // Verificar que se llamó a axios.post con los parámetros correctos
    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8080/create', {
      username: 'testuser',
      password: 'TestPass123'
    })

    expect(store.nextStep).toHaveBeenCalled()
  })

  it('llama a previousStep() al hacer click en el botón atrás', async () => {
    const wrapper = mount(wzStep2Form, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn
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
