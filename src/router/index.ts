import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw} from 'vue-router'
import {content} from "@/router/path";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: "index",
        component: () => import('@/views/index.vue'),
        children: content
    },
    {
        path: '/login',
        name: "name",
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/sso',
        name: "sso",
        component: () => import('@/views/sso/index.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

router.beforeEach((
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext) => {

    if (to.meta.title) document.title = to.meta.title;
    next();
})
export default router
