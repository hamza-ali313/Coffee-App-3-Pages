import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'swiper/css'
import App from './App.vue'
import router from './router'
import './styles/main.scss'

createApp(App).use(createPinia()).use(router).mount('#app')
