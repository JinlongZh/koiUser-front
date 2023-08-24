import service from "@/utils/request";
import {UserInfoResp} from "@/d.ts/api/system/user";

/**
 * 获得登录用户信息
 * @returns
 */
export const getUserInfo = (): Promise<UserInfoResp> => {
    return service.get(`/system/user/profile/get`);
}