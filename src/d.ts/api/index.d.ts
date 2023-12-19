import {HomeInterface} from "@/d.ts/api/blog/home";

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
    HomeInterface
{}