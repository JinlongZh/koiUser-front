import {get} from "@/utils/request";
import {CommonResult} from "@/d.ts/api";

export const listFriendLinks = (): Promise<CommonResult> => {
    return get(`/blog/friend-link/links`)
}