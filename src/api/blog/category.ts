import type {ApiCategoryInterface} from "@/d.ts/api/blog/category";
import {get} from "@/utils/request";

export const apiCategoryInterface: ApiCategoryInterface = {
    listCategories: async () => {
        return await get("/blog/category/list");
    }
}