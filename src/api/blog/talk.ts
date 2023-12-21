import type {TalkInterface} from "@/d.ts/api/blog/talk";
import {get} from "@/utils/request";

export const talkInterface : TalkInterface = {
    pageTalk: (req) => {
        return get("/blog/talk/list", req);
    }
}