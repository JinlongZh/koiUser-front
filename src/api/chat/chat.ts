import {ContactPageReq, ContactRoomResp, MessagePageReq, MessageType, SendMessageReq} from "@/d.ts/api/chat/chat";
import {get, post} from "@/utils/request";
import {CommonResult, PageResult} from "@/d.ts/api";

export const getContactPage = (req: ContactPageReq): Promise<PageResult<ContactRoomResp>> => {
    return get(`/chat/contact/page`, req);
}

export const getMessagePage = (req: MessagePageReq): Promise<PageResult<MessageType>> => {
    return get(`/chat/page`, req);
}

export const sendMessage = (req: SendMessageReq): Promise<CommonResult<MessageType>> => {
    return post(`/chat/send`, req);
}