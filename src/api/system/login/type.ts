// 参数接口
import type {CommonResult} from "@/api/common/type";

export interface LoginParams {
    mobile: string;
    password: string;
}

// 响应接口
export interface LoginResp extends CommonResult{
    data: {
        userId: number;
        accessToken: string;
        refreshToken: string;
        expiresTime: Record<string, unknown>;
    };
}