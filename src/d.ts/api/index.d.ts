import {HomeInterface} from "@/d.ts/api/blog/home";
import type {CategoryInterface} from "@/d.ts/api/blog/category";
import type {ArticleInterface} from "@/d.ts/api/blog/article";
import type {TalkInterface} from "@/d.ts/api/blog/talk";
import type {CommentInterface} from "@/d.ts/api/blog/comment";

export declare interface CommonResult {
    code: number;
    msg: string;
    [propName: string]: any;
}

interface PageInterface {
    [pageNo]: number;
    [pageSize]: number;
}

export declare interface ApiObject extends
    HomeInterface,
    CategoryInterface,
    ArticleInterface,
    TalkInterface,
    CommentInterface
{}