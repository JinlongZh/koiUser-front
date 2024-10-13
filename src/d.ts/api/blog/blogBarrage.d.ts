export interface Message {
    avatar: string;
    nickname: string;
    messageContent: string;
    time: number;
}

export interface MessageAddReq {
    avatar: string;
    nickname: string;
    messageContent: string;
    time: number;
}