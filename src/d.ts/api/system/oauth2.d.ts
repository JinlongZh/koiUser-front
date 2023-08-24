import type {CommonResult} from "@/d.ts/api/common";

// 授权信息 Response
export declare interface AuthorizeInfoResp extends CommonResult{
    data: {
        client: {
            name: string;
            logo: string;
        };
        scopes: {
            key: string;
            value: boolean;
        }[];
    };
}

// 申请授权 Response
export interface AuthorizeResp extends CommonResult{
    data: string;
}
