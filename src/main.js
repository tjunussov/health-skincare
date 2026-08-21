import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import './styles.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App).use(pinia).mount('#app')
registerSW({ immediate: true })
