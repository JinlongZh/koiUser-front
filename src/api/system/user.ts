import {get} from "@/utils/request";
import type {CommonResult} from "@/d.ts/api";
import {UserInfo} from "@/d.ts/api/system/user";

/**
 * 获得登录用户信息
 * @returns
 */
export const getUserInfo = (): Promise<CommonResult> => {
    return get(`/system/user/profile/get`);
}

export const getUserInfoBatch = (userIdList: number[]): Promise<CommonResult<UserInfo[]>> => {
    return get(`/system/user/profile/batch`, {userIdList});
}