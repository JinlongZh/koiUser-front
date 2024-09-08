import {PageParam} from "@/d.ts/api";
import {MessageEnum} from "@/config/constant";

export interface ContactRoomResp {
    roomId: number;
    type: number;
    text: string;
    lastMessageNickname: string;
    name: string;
    avatar: string;
    activeTime: string;
    unreadCount: number;
}

export interface ContactPageReq extends PageParam {
}

export interface MessagePageReq extends PageParam {
    roomId: number;
}

export interface MessageType {
    /** 发送者信息 */
    fromUser: MessageUserType;
    /** 消息主体 */
    message: MsgType;
    /** 发送时间 */
    sendTime: string;
    /** 时间段（可选） */
    timeBlock?: string;
    /** 是否加载中 */
    loading?: boolean;
}

export interface MessageUserType {
    /** 用户ID */
    userId: number;
    /** 用户名 */
    username: string;
    /** 头像 */
    avatar: string;
    /** 归属地 */
    localPlace: string;
}

export interface MsgType {
    /** 消息ID */
    id: number;
    /**  房间 ID */
    roomId: number;
    /** 消息类型 */
    type: MessageEnum;
    /** 动态消息体-`根据消息类型变化` */
    body: TextBody | ImageBody | any;
    /** 发送时间 */
    createTime: string;
}

/** 文本消息体 */
export interface TextBody {
    /** 消息内容 */
    content: string;
    /** 回复 */
    replyMessageId: number;
}

/** 图片消息体 */
export interface ImageBody {
    size: number;
    url: string;
    width: number;
    height: number;
}

/**
 * 发送消息载体
 */
export interface SendMessageReq {
    /** 会话id */
    roomId: number;
    /** 消息类型 */
    messageType: MessageEnum;
    /** 消息体 */
    body: {
        /** 文本消息内容 */
        content?: string;
        /** 回复的消息id */
        replyMessageId?: number;
        /** 任意 */
        [key: string]: any;
    }
}
