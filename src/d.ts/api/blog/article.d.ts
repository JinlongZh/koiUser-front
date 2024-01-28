import type {CommonResult, PageParam} from "@/d.ts/api";


export declare interface ApiArticleInterface {
    pageHomeArticle: (req: ArticlePageReq) => Promise<CommonResult>;
    getArticleDetail: (id: number) => Promise<CommonResult>;
}

interface ArticlePageReq extends PageParam {
    categoryId: number | null;
}

interface ArticleResp {
    id: number;
    articleCover: string;
    articleTitle: string;
    articleContent: string;
    articleTop: number;
    categoryId: number;
    categoryName: string;
    viewCount: number;
    createTime: string;
    updateTime: string;
}