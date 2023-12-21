import type {CommonResult, PageInterface} from "@/d.ts/api";

export declare interface TalkInterface {
    pageTalk: (req: PageInterface) => Promise<CommonResult>;
}