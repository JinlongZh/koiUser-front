import type {ArticleInterface} from "@/d.ts/api/blog/article";
import {get} from "@/utils/request";

export const articleInterface: ArticleInterface = {
    pageHomeArticle: async (req) => {
        return await get("/blog/article/list", req);
    }
}