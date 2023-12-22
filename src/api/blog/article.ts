import type {ArticleInterface} from "@/d.ts/api/blog/article";
import {get} from "@/utils/request";

export const articleInterface: ArticleInterface = {
    pageHomeArticle: async (req) => {
        return await get("/blog/article/list", req);
    },
    getArticleDetail: async (id) => {
        return await get(`/blog/article/detail?id=${id}`);
    }
}