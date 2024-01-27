import resource from "./resource";
import {pathConfig} from "@/config/program";
import type {HeaderConfigType, FooterConfigInterface, SideMenuConfigType} from "@/d.ts/config/site";


/*
 ***************************************************************************************
 *                                    popup
 ***************************************************************************************
 */
// 轻提示图标配置
const tipType: Array<string> = [
    resource.success,
    resource.info,
    resource.warn,
    resource.error
];


/*
 ***************************************************************************************
 *                                    header
 ***************************************************************************************
 */
const headerConfig: HeaderConfigType = [
    {
        path: pathConfig.home,
        icon: resource.home,
        word: "主页"
    },
    {
        path: pathConfig.article,
        icon: resource.article,
        word: "文章"
    },
    {
        path: pathConfig.talk,
        icon: resource.talk,
        word: "说说"
    },
    {
        path: pathConfig.interface,
        icon: resource.interface,
        word: "接口"
    },
    {
        icon: resource.other,
        word: "其他",
        children: [
            {
                path: pathConfig.message,
                icon: resource.message,
                word: "留言"
            },
            {
                path: pathConfig.friend,
                icon: resource.friend,
                word: "友链"
            },
            {
                path: pathConfig.version,
                icon: resource.version,
                word: "版本"
            },
            {
                path: pathConfig.about,
                icon: resource.about,
                word: "关于",
            }
        ]
    }
];

/*
 ***************************************************************************************
 *                                    sideMenu
 ***************************************************************************************
 */

const sideMenuConfig: SideMenuConfigType = [
    {
        path: pathConfig.userCenter_userInfo,
        icon: resource.userInfo,
        word: "个人简介"
    },
]



export {tipType, headerConfig, sideMenuConfig}