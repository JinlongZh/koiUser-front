import {publicPath} from "@/router/path";
import {SiteConfigInterface} from "@/d.ts/config/program";


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

const pathConfig = publicPath;

export {siteConfig, pathConfig}