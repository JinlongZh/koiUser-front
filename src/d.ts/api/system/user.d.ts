import {CommonResult} from "@/d.ts/api";

export declare interface UserInfoResp extends CommonResult {
    data: UserInfo;
}

export declare interface UserInfo {
    id: number;
    nickname: string;
    remark: string;
    email: string;
    mobile: string;
    sex: number;
    avatar: string;
    loginIp: string;
    loginDate: Record<string, unknown>;
    createTime: Record<string, unknown>;
}

export interface CacheUserItem {
    /** userId */
    userId: number;
    /** 用户名称 */
    nickname: string;
    /** 登陆ip */
    loginIp: string;
    /** 归属地 */
    ipSource: string;
    /** 头像 */
    avatar: string;
    /** 最后一次上下线时间 */
    loginDate: number;
    /** 是否需要更新数据源。 */
    needRefresh?: boolean;
    /** 最后更新时间 更新超过 10 分钟异步去更新。 */
    lastModifyTime: number;

}