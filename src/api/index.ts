import type {ApiObject} from "@/d.ts/api";
import {homeInterface} from "@/api/blog/home";
import {categoryInterface} from "@/api/blog/category";
import {articleInterface} from "@/api/blog/article";

const api: ApiObject = {
    ...homeInterface,
    ...categoryInterface,
    ...articleInterface
}

export default api;