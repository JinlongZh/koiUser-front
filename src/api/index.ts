import type {ApiObject} from "@/d.ts/api";
import {apiHomeInterface} from "@/api/blog/home";
import {apiCategoryInterface} from "@/api/blog/category";
import {apiArticleInterface} from "@/api/blog/article";
import {apiTalkInterface} from "@/api/blog/talk";
import {apiCommentInterface} from "@/api/blog/comment";
import {apiWebsiteConfigInterface} from "@/api/system/websiteConfig";

const api: ApiObject = {
    //system
    apiWebsiteConfigInterface,
    // blog
    ...apiHomeInterface,
    ...apiCategoryInterface,
    ...apiArticleInterface,
    ...apiTalkInterface,
    ...apiCommentInterface
}

export default api;