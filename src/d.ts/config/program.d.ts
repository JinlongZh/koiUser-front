export declare interface SiteConfigInterface {
    tokenHeader: {
        AccessToken: string;
        RefreshToken: string;
    };
    tokenExpireTime: number;
    mpThreshold: number;
    aesKey: string;
    aesIV: string;
    enterURL: string;
    keepAliveRoute: Array<string>;
    avatarMaxSize: number;
    avatarImgType: Array<string>;
    sideBarShowStorage: string;
}