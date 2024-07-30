export interface FriendLinkResp {
    id: number;
    linkName: string;
    linkAvatar: string;
    linkAddress: string;
    linkIntro: string;
    createTime: string;
    updateTime: string;
}

export interface FriendLinkAddReq {
    linkName: string;
    linkIntro: string;
    linkAvatar: string;
    linkAddress: string;
}