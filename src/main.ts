import "@/assets/scss/index.scss"
import 'element-plus/theme-chalk/src/index.scss'
import "//at.alicdn.com/t/c/font_4209723_3886gu2r0se.js"
import "@/assets/iconfont/icon.css"
import "@/assets/css/iconfont.css";
import "virtual:svg-icons-register"

import { $process } from "@/plugins/index.ts";
import initSvgIcon from "@/assets/icons/index"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import resource from "@/config/resource";

import App from './App.vue'
import lazyPlugin from "vue3-lazy";
import router from './router'

const app = createApp(App)

const plugins = [$process];
plugins.forEach(plugin => {
    app.use(plugin);
});

app.use(createPinia())
app.use(router)
// 懒加载
app.use(lazyPlugin, {
    loading: resource.loading,
    error: resource.errorPage
});


app.mount('#app')

app.use(initSvgIcon)

// Vue.filter("date", function(value) {
//     return dayjs(value).format("YYYY-MM-DD");
// });
//
// Vue.filter("year", function(value) {
//     return dayjs(value).format("YYYY");
// });
//
// Vue.filter("hour", function(value) {
//     return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
// });