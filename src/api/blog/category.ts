import type {CategoryInterface} from "@/d.ts/api/blog/category";
import {get} from "@/utils/request";

export const categoryInterface: CategoryInterface = {
    listCategories: async () => {
        return await get("/blog/category/list");
    }
}