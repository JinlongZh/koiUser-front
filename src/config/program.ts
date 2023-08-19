import {publicPath} from "@/router/path";
import {SiteConfigInterface, UrlConfigInterface} from "@/d.ts/config/program";


const siteConfig: SiteConfigInterface = {
    tokenHeader: {
        AccessToken: "AccessToken",
        RefreshToken: "RefreshToken"
    },
    tokenExpireTime: 30,
    mpThreshold: 800,
    aesKey: "",
    aesIV: "",
    enterURL: "enterURL",
    keepAliveRoute: ["Home", "Message", "Friend", "Version", "About"],
    avatarMaxSize: 5,
    avatarImgType: ["image/png", "image/jpg", "image/jpeg"],
    sideBarShowStorage: "isSideBarShow"
}

const urlConfig: UrlConfigInterface = {
    // siteUrl: process.env.VITE_SITE_URL!,
    siteUrl: "xxx",
    zwfwUrl: "https://beian.miit.gov.cn",
    warehouseUrl: "https://github.com/JinLonGzh/koiUser-front",
};

const pathConfig = publicPath;

export {siteConfig, pathConfig, urlConfig}