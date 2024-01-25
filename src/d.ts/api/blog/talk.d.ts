import type {CommonResult, PageParam} from "@/d.ts/api";

export declare interface ApiTalkInterface {
    pageTalk: (req: PageParam) => Promise<CommonResult>;
    getTalkDetail: (id: number) => Promise<CommonResult>;
}

interface TalkResp {
    id: number;
    content: string;
    imageList: string[];
    talkTop: number;
    status: number;
    viewCount: number;
    createTime: string;
    updateTime: string;
}