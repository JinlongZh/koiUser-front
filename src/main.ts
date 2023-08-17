import "@/assets/scss/index.scss"
import 'element-plus/theme-chalk/src/index.scss'
import "//at.alicdn.com/t/c/font_4209723_p0gd03sbioc.js"
import "@/assets/iconfont/icon.css"

import { $process } from "@/plugins/index.ts";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const plugins = [$process];
plugins.forEach(plugin => {
    app.use(plugin);
});

app.use(createPinia())
app.use(router)


app.mount('#app')
