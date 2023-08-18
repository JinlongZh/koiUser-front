import service from "@/utils/request";
import {UserInfoResp} from "@/d.ts/api/user";

/**
 * 获得登录用户信息
 * @returns
 */
export function getUserInfo(): Promise<UserInfoResp> {
    return service.get(`/app-api/system/user/profile/get`);
}