import {CacheUserItem} from "@/d.ts/api/system/user";

export interface IPerson extends Partial<CacheUserItem> {
}

export interface IMention extends Pick<IPerson, 'userId' | 'nickname' | 'avatar'> {
    offset: number
    length: number
}

export enum NodeType {
    text = 'text',
    br = 'br',
    at = 'at',
}

export interface INode {
    type: NodeType,
    data: IPerson | string,
}