import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import { i18n } from './i18n'
import './assets/scss/main.scss'

const app = createApp(App)


app.use(createPinia())
app.use(i18n)

app.mount('#app') 