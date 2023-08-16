import "@/assets/scss/index.scss"
import 'element-plus/theme-chalk/src/index.scss'
import "//at.alicdn.com/t/c/font_4209723_emjgk4t7vbw.js"
import "@/assets/iconfont/icon.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)


app.mount('#app')
