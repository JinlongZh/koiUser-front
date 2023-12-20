import {CommonResult} from "@/d.ts/api";

export declare interface CategoryInterface {
    listCategories: () => Promise<PageResultCategoryResp>;
}

interface Category {
    id: number;

    categoryName: string;

    articleCount: number;
}

interface PageResultCategoryResp extends CommonResult {
    data: {
        list: Array<Category>,
        total: number;
    };
}