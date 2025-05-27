import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import { VueTheMask } from 'vue-the-mask'

const pinia = createPinia()
loadFonts()

const app = createApp(App) 
app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(VueTheMask)
app.mount('#app')
