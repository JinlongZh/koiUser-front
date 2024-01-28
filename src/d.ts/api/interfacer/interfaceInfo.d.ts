import type {CommonResult} from "@/d.ts/api";

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
    status: number; //（0-关闭，1-开启）
    method: string;
    createTime: string;
    updateTime: string;
}

export declare interface InterfaceInfoResp extends CommonResult {
    data: InterfaceInfo;
}