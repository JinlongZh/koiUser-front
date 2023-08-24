import service from "@/utils/request";
import {AuthorizeInfoResp, AuthorizeResp} from "@/d.ts/api/system/oauth2";

/**
 * 获得授权信息
 * @param {string} clientId 客户端编号
 * @returns
 */
export const getAuthorizeInfo = (clientId: string): Promise<AuthorizeInfoResp> => {
    return service.get(`/system/oauth2/authorize?clientId=${clientId}`);
}

/**
 * 申请授权
 * @param responseType
 * @param clientId
 * @param redirectUri
 * @param {string} state
 * @param autoApprove
 * @param checkedScopes
 * @param uncheckedScopes
 * @returns 重定向地址
 */
export const authorize = (responseType: string, clientId: string, redirectUri: string, state: string,
                          autoApprove: boolean, checkedScopes: string[], uncheckedScopes: string[]): Promise<AuthorizeResp> => {
    // 构建 scopes
    const scopes = {}
    for (const scope of checkedScopes) {
        scopes[scope] = true;
    }
    for (const scope of uncheckedScopes) {
        scopes[scope] = false
    }
    return service({
        url: '/system/oauth2/authorize',
        params: {
            response_type: responseType,
            client_id: clientId,
            redirect_uri: redirectUri,
            state: state,
            auto_approve: autoApprove,
            scope: JSON.stringify(scopes)
        },
        method: 'post'
    })
}