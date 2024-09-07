// 1.登录返回二维码 2.用户扫描成功等待授权 3.用户登录成功返回用户信息 4.收到消息 5.上下线推送 6.前端token失效
export enum WsResponseMessageType {
    /**0.收到消息 */
    ReceiveMessage = 1,
}

/**
 * ws 请求 消息类型 1.请求登录二维码，2心跳检测 3用户认证
 */
export enum WsRequestMessageType {
    /** 1.心跳检测 */
    HeartBeatDetection = 1,
}

export type WsReqMsgContentType = {
    type: WsRequestMessageType
    data?: Record<string, unknown>
}