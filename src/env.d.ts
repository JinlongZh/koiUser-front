/// <reference types="vite/client" />
declare module "jsencrypt/bin/jsencrypt.min";

interface ImportMetaEnv {
    /** API 前缀 */
    readonly VITE_BASE_URL: string
    /** WS 地址 */
    readonly VITE_WS_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
