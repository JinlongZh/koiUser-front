export declare interface SiteConfigInterface {
    tokenHeader: {
        sToken: string;
        lToken: string;
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


export declare interface UrlConfigInterface {
    siteUrl: string;
    zwfwUrl: string;
    warehouseUrl: string;
}