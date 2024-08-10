import {ContactPageReq, ContactRoomResp, MessagePageReq} from "@/d.ts/api/chat/chat";
import {get} from "@/utils/request";
import {PageResult} from "@/d.ts/api";

export const getContactPage = (req: ContactPageReq): Promise<PageResult<ContactRoomResp>> => {
    return get(`/chat/contact/page`, req);
}

export const getMessagePage = (req: MessagePageReq) => {
    return get(`/chat/page`, req);
}