import type {ApiWebsiteConfigInterface} from "@/d.ts/api/system/websiteConfig";
import {get} from "@/utils/request";

export const apiWebsiteConfigInterface: ApiWebsiteConfigInterface = {

}

export const getWebsiteConfig = async () => {
    return await get("/system/config/get");
}