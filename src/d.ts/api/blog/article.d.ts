import type {CommonResult, PageParam} from "@/d.ts/api";


export declare interface ApiArticleInterface {
    pageHomeArticle: (req: ArticlePageReq) => Promise<CommonResult>;
    getArticleDetail: (id: number) => Promise<CommonResult>;
}

interface ArticlePageReq extends PageParam {
    categoryId: number;
}