import {PageParam} from "@/d.ts/api";
import {MessageEnum} from "@/config/constant";

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

export interface ContactPageReq extends PageParam {
}

export interface MessagePageReq extends PageParam{
    roomId: number;
}

export interface MessageType {
    /** 发送者信息 */
    fromUser: MessageUserType;
    /** 消息主体 */
    message: MessageType;
    /** 发送时间 */
    sendTime: string;
    /** 时间段（可选） */
    timeBlock?: string;
    /** 是否加载中 */
    loading?: boolean;
}

export interface MessageUserType {
    /** 用户ID */
    uid: number;
    /** 用户名 */
    username: string;
    /** 头像 */
    avatar: string;
    /** 归属地 */
    locPlace: string;
}

export interface MessageType {
    /** 消息ID */
    id: number;
    /**  房间 ID */
    roomId: number;
    /** 消息类型 */
    type: MessageEnum;
    /** 动态消息体-`根据消息类型变化` */
    body: TextBody | ImageBody | any;
    /** 发送时间戳 */
    sendTime: number;
}

/** 文本消息体 */
export interface TextBody  {
    /** 消息内容 */
    content: string;
    /** 回复 */
    replyMessageId: number;
}

/** 图片消息体 */
export interface ImageBody  {
    size: number;
    url: string;
    width: number;
    height: number;
}
