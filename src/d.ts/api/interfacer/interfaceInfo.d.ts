import type {CommonResult} from "@/d.ts/api/common";

export declare interface PageResultInterfaceInfoResp extends CommonResult{
    data: {
        /*数据 */
        list: {
            id: number;
            name: string;
            description: string;
            host: string;
            url: string;
            requestParams: string;
            requestHeader: string;
            responseHeader: string;
            status: number
            method: string;
            userId: number;
            createTime: Record<string, unknown>;
            updateTime: Record<string, unknown>;
        }[];
        total: number;
    };
}