import service from "@/utils/request";
import {LoginParams, LoginResp} from "@/d.ts/api/login.d.ts";

/**
 * 使用手机 + 密码登录
 */
export function login(params: LoginParams): Promise<LoginResp> {
    return service.post(`/system/auth/login`, params);
}