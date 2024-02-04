import type {ApiWebsiteConfigInterface} from "@/d.ts/api/system/websiteConfig";
import {get, post} from "@/utils/request";

export const apiWebsiteConfigInterface: ApiWebsiteConfigInterface = {

}

export const getWebsiteConfig = async () => {
    return await get("/system/config/get");
}

export const report = async () => {
    return await post("/system/log-visit/report");
}