import service from "@/utils/request";
import type {LoginParams, LoginResp} from "@/api/system/login/type";

/**
 * 使用手机 + 密码登录
 */
export function login(params: LoginParams): Promise<LoginResp> {
    return service.post(`/system/auth/login`, params);
}