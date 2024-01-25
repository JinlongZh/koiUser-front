import {CommonResult} from "@/d.ts/api";

export declare interface ApiCategoryInterface {
    listCategories: () => Promise<CommonResult>;
}

interface CategoryResp {
    id: number;

    categoryName: string;

    articleCount: number;
}