import {CommonResult} from "@/d.ts/api/common.d.ts";

export declare interface UserInfoResp extends CommonResult {
    data: {
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
}