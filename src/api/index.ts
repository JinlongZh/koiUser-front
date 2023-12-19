import type {ApiObject} from "@/d.ts/api";
import {homeInterface} from "@/api/blog/home";

const api: ApiObject = {
    ...homeInterface
}

export default api;