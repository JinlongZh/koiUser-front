import type {RouteRecordRaw} from "vue-router";

const publicPath = {
    home: "/",
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
    friend:"/friend",
    blogBarrage:"/blogBarrage",
    // im
    im: "/im",
    chat: "/chat",
    contacts: "/contact",


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
        meta: {
            title: "锦理的集装箱",
        },
        component: () => import("@/views/content/Home.vue")
    },
    // 文章
    {
        path: publicPath.article,
        children: [
            {
                path: "",
                name: "article",
                meta: {
                    title: "文章",
                },
                component: () => import("@/views/content/article/Article.vue")
            },
            {
                path: "detail/:id",
                name: "articleDetail",
                component: () => import("@/views/content/article/ArticleDetail.vue")
            },
        ]
    },

    // 说说
    {
        path: publicPath.talk,
        children: [
            {
                path: "",
                name: "talk",
                meta: {
                    title: "说说",
                },
                component: () => import("@/views/content/talk/Talk.vue")
            },
            {
                path: "detail/:id",
                name: "talkDetail",
                component: () => import("@/views/content/talk/TalkDetail.vue")
            },
        ]
    },

    // 开放接口
    {
        path: publicPath.interface,
        name: "interface",
        meta: {
            title: "接口",
        },
        component: () => import("@/views/content/interface/Interface.vue"),
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
    //友链
    {
        path: publicPath.friend,
        name: "friend",
        meta: {
            title: "友链",
        },
        component: () => import("@/views/content/friend/Friend.vue"),
    },
    //留言
    {
        path: publicPath.blogBarrage,
        name: "blogBarrage",
        meta: {
            title: "留言",
        },
        component: () => import("@/views/content/blogBarrage/BlogBarrage.vue"),
    },
    // im
    {
        path: publicPath.im,
        name: "im",
        meta: {
            title: "聊天室",
        },
        redirect: publicPath.chat,
        component: () => import("@/views/content/im/Im.vue"),
        children: [
            {
                path: publicPath.chat,
                name: 'chat',
                component: () => import("@/views/content/im/components/chat/ImChat.vue"),
            },
            {
                path: publicPath.contacts,
                name: 'contact',
                component: () => import("@/views/content/im/components/contact/ImContacts.vue"),
            },
        ],
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