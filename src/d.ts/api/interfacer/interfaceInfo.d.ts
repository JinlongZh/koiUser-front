import type {CommonResult} from "@/d.ts/api/common";

export declare interface InterfaceInfo {
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
}

export declare interface PageResultInterfaceInfoResp extends CommonResult {
    data: {
        /*数据 */
        list: Array<InterfaceInfo>,
        total: number;
    };
}