import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 注册路由
import { createPinia } from 'pinia' 
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router).mount('#app')

