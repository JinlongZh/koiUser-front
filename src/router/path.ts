import type {RouteRecordRaw} from "vue-router";

const publicPath = {
    home: "/",
    message: "/message",
    friend: "/friend",
    version: "/version",
    about: "/about",
    errorPath: {
        route: "/error/errorRoute",
        context: "/error/errorContext"
    },
    userCenter: "/user-center"
}

const common: Array<RouteRecordRaw> = [
    {
        path: "/error/:type",
        name: "errorPage",
        component: () => import("@/views/common/ErrorPage.vue"),
    }
]

const content: Array<RouteRecordRaw> = [
    ...common,
    {
        path: "",
        name: "home",
        component: () => import("@/views/content/Home.vue")
    },
    {
        path: publicPath.userCenter,
        name: "userCenter",
        component: () => import("@/views/content/userCenter/index.vue")
    },
]


export {publicPath, content};