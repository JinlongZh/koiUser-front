import type {ApiArticleInterface} from "@/d.ts/api/blog/article";
import {get} from "@/utils/request";

export const apiArticleInterface: ApiArticleInterface = {
    pageHomeArticle: async (req) => {
        return await get("/blog/article/list", req);
    },
    getArticleDetail: async (id) => {
        return await get(`/blog/article/detail?id=${id}`);
    }
}