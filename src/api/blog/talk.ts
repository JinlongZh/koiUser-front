import type {ApiTalkInterface} from "@/d.ts/api/blog/talk";
import {get} from "@/utils/request";

export const apiTalkInterface : ApiTalkInterface = {
    pageTalk: (req) => {
        return get("/blog/talk/list", req);
    },
    getTalkDetail: (id) => {
        return get(`/blog/talk/detail?id=${id}`);
    }
}