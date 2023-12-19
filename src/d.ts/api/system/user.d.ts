import {CommonResult} from "@/d.ts/api";

export declare interface UserInfoResp extends CommonResult {
    data: Partial<UserInfo>;
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