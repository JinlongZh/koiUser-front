import {ApiHomeInterface} from "@/d.ts/api/blog/home";
import {get} from "@/utils/request";

export const apiHomeInterface: ApiHomeInterface = {
    pageHomeList: async (req) => {
        return await get("/blog/home/list", req);
    }
}