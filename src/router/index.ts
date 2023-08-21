import {createRouter, createWebHistory} from 'vue-router'
import {content} from "@/router/path";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: "index",
            component: () => import('@/views/index.vue'),
            children: content
        },
        {
            path: '/login',
            name: "name",
            component: () => import('@/views/common/login/index.vue'),
        },
    ]
})

export default router
