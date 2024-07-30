import {get, post} from "@/utils/request";
import {CommonResult} from "@/d.ts/api";
import {FriendLinkAddReq} from "@/d.ts/api/blog/friend";

export const listFriendLinks = (): Promise<CommonResult> => {
    return get(`/blog/friend-link/links`)
}

export const submitFriendLink = (req: FriendLinkAddReq): Promise<CommonResult> => {
    return post(`/blog/friend-link/submit`, req)
}