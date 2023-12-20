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
    // 用户中心
    userCenter: "/userCenter",
    userCenter_userInfo: "/userCenter/userInfo",
    // 开放接口
    interface: "/interface",
    interfaceList: "/interface/list",
    // blog
    article: "/article",
    talk: "/talk",

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
    // 主页
    {
        path: "",
        name: "home",
        component: () => import("@/views/content/Home.vue")
    },
    // 文章
    {
        path: publicPath.article,
        name: "article",
        component: () => import("@/views/content/article/Article.vue")
    },
    // 说说
    {
        path: publicPath.talk,
        name: "talk",
        component: () => import("@/views/content/talk/Talk.vue")
    },
    // 开放接口
    {
        path: publicPath.interface,
        name: "interface",
        component: () => import("@/views/content/interface/index.vue"),
        redirect: publicPath.interfaceList,
        children: [
            {
                path: publicPath.interfaceList,
                name: "interfaceList",
                component: () => import("@/views/content/interface/components/InterfaceList.vue")
            },
        ]
    },
    {
        path: "/interface/detail/:id",
        name: "interfaceDetail",
        component: () => import("@/views/content/interface/InterfaceDetail.vue")
    },
    // 用户中心
    {
        path: publicPath.userCenter,
        name: "userCenter",
        component: () => import("@/views/content/userCenter/index.vue"),
        redirect: publicPath.userCenter_userInfo,
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