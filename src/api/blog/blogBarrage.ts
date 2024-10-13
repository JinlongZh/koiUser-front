import {get, post} from "@/utils/request";
import {CommonResult} from "@/d.ts/api";
import type {Message, MessageAddReq} from "@/d.ts/api/blog/blogBarrage";

export const queryMessage = (): Promise<CommonResult<Message[]>> => {
    return get('/blog/barrage/list');
}

export const addMessage = (req: MessageAddReq): Promise<CommonResult> => {
    return post('/blog/barrage/add', req);
}