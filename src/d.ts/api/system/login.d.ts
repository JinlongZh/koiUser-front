import {CommonResult} from "@/d.ts/api";

export declare interface LoginParams {
    mobile: string;
    password: string;
}

// 响应接口
export declare interface LoginResp extends CommonResult {
    data: {
        userId: number;
        accessToken: string;
        refreshToken: string;
        expiresTime: Record<string, unknown>;
    };
}