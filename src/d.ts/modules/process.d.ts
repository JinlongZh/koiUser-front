import { Ref, UnwrapNestedRefs } from "vue";

export declare interface ProcessInterface extends PopupInterface, ComponentInterface {

}

/*
 ***************************************************************************************
 *                                    popup
 ***************************************************************************************
 */

export declare interface PopupInterface {

    tipSentry: Ref<boolean>;
    tipList: UnwrapNestedRefs<{msg: string, type: number}>;
    tipShow: TipShowInterface;

}

interface TipShowInterface {
    success: (msg: string) => void;
    info: (msg: string) => void;
    warn: (msg: string) => void;
    error: (msg: string) => void;
}

/*
 ***************************************************************************************
 *                                    component
 ***************************************************************************************
 */

export declare interface ComponentInterface {

    headerStatus: Ref<boolean>;
    headerCheckLock: Ref<boolean>;
    headerCheckSwitch: (clientHeight: number, HTMLHeight: number) => void;

}