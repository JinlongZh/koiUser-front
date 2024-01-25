import "@/assets/scss/index.scss"
import 'element-plus/theme-chalk/src/index.scss'
import "//at.alicdn.com/t/c/font_4209723_3886gu2r0se.js"
import "@/assets/iconfont/icon.css"
import "@/assets/css/iconfont.css";
import "virtual:svg-icons-register"
import 'md-editor-v3/lib/preview.css'; // md-editor-v3
import dayjs from "dayjs";

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

// 日期格式化
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $filters: {
            date: (value: any) => string;
            year: (value: any) => string;
            hour: (value: any) => string;
            num: (value: any) => string;
        };
    }
}
app.config.globalProperties.$filters = {
    date: (value) => dayjs(value).format('YYYY-MM-DD'),
    year: (value) => dayjs(value).format('YYYY'),
    hour: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    num: (value) => (value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value),
};



app.mount('#app')

app.use(initSvgIcon)
