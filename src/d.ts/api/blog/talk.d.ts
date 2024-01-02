import type {CommonResult, PageInterface} from "@/d.ts/api";

export declare interface TalkInterface {
    pageTalk: (req: PageInterface) => Promise<CommonResult>;
    getTalkDetail: (id: number) => Promise<CommonResult>;
}

interface TalkDetailInterface {
    id: number;
    content: string;
    imageList: Record<string, unknown>[];
    talkTop: number;
    status: number;
    viewCount: number;
    createTime: Record<string, unknown>;
    updateTime: Record<string, unknown>;
}