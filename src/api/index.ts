import type {ApiObject} from "@/d.ts/api";
import {homeInterface} from "@/api/blog/home";
import {categoryInterface} from "@/api/blog/category";
import {articleInterface} from "@/api/blog/article";
import {talkInterface} from "@/api/blog/talk";
import {commentInterface} from "@/api/blog/comment";

const api: ApiObject = {
    ...homeInterface,
    ...categoryInterface,
    ...articleInterface,
    ...talkInterface,
    ...commentInterface
}

export default api;