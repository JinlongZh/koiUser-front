import type {CommonResult, PageParam} from "@/d.ts/api";

interface GetHomeListReq extends PageParam {
}

export declare interface ApiHomeInterface {
    pageHomeList: (req: GetHomeListReq) => Promise<CommonResult>;
}