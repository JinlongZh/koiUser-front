import resource from "./resource";
import {pathConfig} from "@/config/program";
import type {HeaderConfigType} from "@/d.ts/config/site";


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


export {tipType, headerConfig}