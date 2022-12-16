import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

import './assets/main.css'

const app = createApp(App)

const pinia = createPinia();

pinia.use(({store})=> {
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/js/all.js'
