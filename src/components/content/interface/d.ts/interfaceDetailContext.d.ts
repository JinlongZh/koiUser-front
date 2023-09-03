import {InterfaceInfo} from "@/d.ts/api/interfacer/interfaceInfo";

export declare interface InterfaceContextInterface {
    data: Array<Partial<InterfaceInfo>>;
    init: (cx: Array<Partial<InterfaceInfo>>) => void;
}