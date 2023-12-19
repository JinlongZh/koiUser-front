import {HomeInterface} from "@/d.ts/api/blog/home";
import {get} from "@/utils/request";

export const homeInterface: HomeInterface = {
    pageHomeList: async (req) => {
        return await get("/blog/home/list", req);
    }
}