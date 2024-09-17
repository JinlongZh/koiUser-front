import {post} from "@/utils/request";
import {LoginParams, LoginResp} from "@/d.ts/api/system/login.d.ts";
import type {CommonResult} from "@/d.ts/api";

/**
 * 使用手机 + 密码登录
 */
export const login = (params: LoginParams): Promise<LoginResp> => {
    return post(`/system/auth/login`, params);
}

/**
 * 刷新令牌
 * @param {string} refreshToken 刷新令牌
 * @returns
 */
export const refreshToken = (refreshToken: string): Promise<LoginResp> => {
    return post(`/system/auth/refresh-token?refreshToken=${refreshToken}`);
}

/**
 * 退出登录
 * @returns
 */
export const logout = () : Promise<CommonResult> => {
    return post(`/system/auth/logout`);
}