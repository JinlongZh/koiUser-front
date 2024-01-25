import {CommonResult, PageParam} from "@/d.ts/api";

export declare interface ApiCommentInterface {
    listComment: (req: CommentQueryReq) => Promise<CommonResult>;
    pageCommentReply: (req: ReplyQueryReq) => Promise<CommonResult>;
    insertComment: (req: CommentAddReq) => Promise<CommonResult>;
}

interface CommentQueryReq extends PageParam {
    commentType: number;
    topicId: number;
}

interface CommentAddReq {
    type: number;
    topicId: number;
    commentContent: string;
    parentId: number;
    replyUserId: number;
}

interface ReplyQueryReq extends PageParam {
    commentId: number;
}

interface CommentResp {
    id: number;
    userId: number;
    nickname: string;
    avatar: string;
    commentContent: string;
    createTime: Record<string, unknown>;
    replyCount: number;
    replyList: Array<ReplyInterface>;
}

interface ReplyResp {
    id: number;
    parentId: number;
    userId: number;
    nickname: string;
    avatar: string;
    replyUserId: number;
    replyNickname: string;
    commentContent: string;
    createTime: string;
}