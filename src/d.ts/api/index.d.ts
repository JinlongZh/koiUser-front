import {ApiHomeInterface} from "@/d.ts/api/blog/home";
import type {ApiCategoryInterface} from "@/d.ts/api/blog/category";
import type {ApiArticleInterface} from "@/d.ts/api/blog/article";
import type {ApiTalkInterface} from "@/d.ts/api/blog/talk";
import type {ApiCommentInterface} from "@/d.ts/api/blog/comment";
import type {ApiWebsiteConfigInterface} from "@/d.ts/api/system/websiteConfig";

export declare interface CommonResult {
    code: number;
    msg: string;
    [propName: string]: any;
}

interface PageParam {
    pageNo: number;
    pageSize: number;
}

export declare interface ApiObject extends
    // system
    ApiWebsiteConfigInterface,
    // blog
    ApiHomeInterface,
    ApiCategoryInterface,
    ApiArticleInterface,
    ApiTalkInterface,
    ApiCommentInterface
{}