import type {CommonResult} from "@/d.ts/api/common";

export declare interface InterfaceInfo {
    id: number;
    name: string;
    description: string;
    host: string;
    url: string;
    requestParamList: {
        name: string;
        required: number;
        type: string;
        describe: string;
    }[];
    responseParamList: {
        name: string;
        type: string;
        describe: string;
    }[];
    requestHeader: string;
    responseHeader: string;
    status: number
    method: string;
    createTime: Record<string, unknown>;
    updateTime: Record<string, unknown>;
}

export declare interface PageResultInterfaceInfoResp extends CommonResult {
    data: {
        list: Array<Partial<InterfaceInfo>>,
        total: number;
    };
}