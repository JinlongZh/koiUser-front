import type {RouteRecordRaw} from "vue-router";

const publicPath = {
    home: "/",
    interface: "/interface",
    message: "/message",
    friend: "/friend",
    version: "/version",
    about: "/about",
    errorPath: {
        route: "/error/errorRoute",
        context: "/error/errorContext"
    },
    // 个人中心
    userCenter: "/userCenter",
    userCenter_userInfo: "/userCenter/userInfo",
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
        path: publicPath.interface,
        name: "interface",
        component: () => import("@/views/content/interface/index.vue")
    },
    {
        path: publicPath.userCenter,
        name: "userCenter",
        component: () => import("@/views/content/userCenter/index.vue"),
        children: [
            {
                path: publicPath.userCenter_userInfo,
                name: "userCenter_UserInfo",
                component: () => import("@/views/content/userCenter/components/UserInfo.vue")
            }
        ]
    },
]


export {publicPath, content};