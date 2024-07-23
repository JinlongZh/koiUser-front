import service, {get} from "@/utils/request";
import type {CommonResult} from "@/d.ts/api";

/**
 * 获得登录用户信息
 * @returns
 */
export const getUserInfo = (): Promise<CommonResult> => {
    return get(`/system/user/profile/get`);
}