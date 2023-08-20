import service from "@/utils/request";
import {LoginParams, LoginResp} from "@/d.ts/api/login.d.ts";

/**
 * 使用手机 + 密码登录
 */
export const login = (params: LoginParams): Promise<LoginResp> => {
    return service.post(`/system/auth/login`, params);
}

/**
 * 刷新令牌
 * @param {string} refreshToken 刷新令牌
 * @returns
 */
export const refreshToken = (refreshToken: string): Promise<LoginResp> => {
    return service.post(`/system/auth/refresh-token?refreshToken=${refreshToken}`);
}