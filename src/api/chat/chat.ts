import {
    ContactPageReq,
    ContactRoomResp,
    MessagePageReq,
    MessageType,
    ReadMessageReqVO,
    SendMessageReq
} from "@/d.ts/api/chat/chat";
import {get, post, put} from "@/utils/request";
import {CommonResult, PageResult} from "@/d.ts/api";

export const getContactPage = (req: ContactPageReq): Promise<PageResult<ContactRoomResp>> => {
    return get(`/chat/contact/page`, req);
}

export const getContactDetail = (roomId: number): Promise<CommonResult<ContactRoomResp>> => {
    return get(`/chat/contact/detail?roomId=${roomId}`);
}

export const getMessagePage = (req: MessagePageReq): Promise<PageResult<MessageType>> => {
    return get(`/chat/page`, req);
}

export const sendMessage = (req: SendMessageReq): Promise<CommonResult<MessageType>> => {
    return post(`/chat/send`, req);
}

export const readMessage = (req: ReadMessageReqVO): Promise<CommonResult> => {
    return put(`/chat/read`, req);
}