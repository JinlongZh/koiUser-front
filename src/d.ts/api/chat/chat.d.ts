import {PageParam} from "@/d.ts/api";

export interface ContactRoomResp {
    roomId: number;
    type: number;
    text: string;
    lastMessageNickName: string;
    name: string;
    avatar: string;
    activeTime: string;
    unreadCount: number;
}

export interface ContactPageReq extends PageParam {}
