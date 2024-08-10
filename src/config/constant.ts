export enum UrlReqType {
    "param",
    "path",
    "mix"
}

export enum CommentApiType {
    "default",
    "article",
    "talk"
}

/** 房间类型 1群聊 2单聊 */
export enum RoomTypeEnum {
    /** 1群聊 */
    Group = 1,
    /** 2单聊 */
    Single,
}

export enum MessageEnum {
    /** 未知 */
    UNKNOWN,
    /** 文本 */
    TEXT,
    /** 撤回 */
    RECALL,
    /** 图片 */
    IMAGE,
    /** 文件 */
    FILE,
    /** 语音 */
    VOICE,
    /** 视频 */
    VIDEO,
    /** 表情包 */
    EMOJI,
    /** 系统消息 */
    SYSTEM,
}