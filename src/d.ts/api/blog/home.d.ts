import type {CommonResult, PageInterface} from "@/d.ts/api";

interface GetHomeListReqInterface extends PageInterface {
}

export declare interface HomeInterface {
    pageHomeList: (req: GetHomeListReqInterface) => Promise<CommonResult>;
}