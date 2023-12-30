import {CommonResult, PageInterface} from "@/d.ts/api";

export declare interface CommentInterface {
    listComment: (req: CommentQueryInterface) => Promise<CommonResult>;
    pageCommentReply: (req: ReplyQueryInterface) => Promise<CommonResult>;
    insertComment: (req: CommentAddInterface) => Promise<CommonResult>;
}

interface CommentQueryInterface extends PageInterface {
    commentType: number;
    topicId: number;
}

interface CommentAddInterface {
    type: number;
    topicId: number;
    commentContent: string;
    parentId: number;
    replyUserId: number;
}

interface ReplyQueryInterface extends PageInterface {
    commentId: number;
}

interface CommentItemInterface {
    id: number;
    userId: number;
    nickname: string;
    avatar: string;
    commentContent: string;
    createTime: Record<string, unknown>;
    replyCount: number;
    replyList: Partial<Array<ReplyInterface>>
}

interface ReplyInterface {
    id: number;
    parentId: number;
    userId: number;
    nickname: string;
    avatar: string;
    replyUserId: number;
    replyNickname: string;
    commentContent: string;
    createTime: Record<string, unknown>;
}