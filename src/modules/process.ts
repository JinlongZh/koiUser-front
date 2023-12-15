import {PopupInterface, ProcessInterface, ComponentInterface} from "@/d.ts/modules/process";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";

const Popup: PopupInterface = {

    // 轻提示
    tipSentry: ref(false),
    tipList: reactive({
        msg: "",
        type: 0
    }),
    tipShow: {
        // success: (msg) => {
        //     Popup.tipList.msg = msg;
        //     Popup.tipList.type = 0;
        //     Popup.tipSentry.value = !Popup.tipSentry.value;
        // },
        // info: (msg) => {
        //     Popup.tipList.msg = msg;
        //     Popup.tipList.type = 1;
        //     Popup.tipSentry.value = !Popup.tipSentry.value;
        // },
        // warn: (msg) => {
        //     Popup.tipList.msg = msg;
        //     Popup.tipList.type = 2;
        //     Popup.tipSentry.value = !Popup.tipSentry.value;
        // },
        // error: (msg) => {
        //     Popup.tipList.msg = msg;
        //     Popup.tipList.type = 3;
        //     Popup.tipSentry.value = !Popup.tipSentry.value;
        // }
        success: (msg) => {
            ElMessage.success(msg);
        },
        info: (msg) => {
            ElMessage.info(msg);
        },
        warn: (msg) => {
            ElMessage.warning(msg);
        },
        error: (msg) => {
            ElMessage.error(msg);
        }
    },

    // 页面跳转加载页面
    loadStatus: ref(true),
    loadShow() { Popup.loadStatus.value = true; },
    loadHide() { Popup.loadStatus.value = false; },

}

const Component: ComponentInterface = {
    // 顶部导航栏
    headerStatus: ref(true),
    headerCheckLock: ref(true),
    headerCheckSwitch(clientHeight, HTMLHeight) {
        Component.headerCheckLock.value = HTMLHeight < clientHeight;
    },

    // 底部组件
    footerStatus: ref(true),
    footerPosition: ref(true),
    footerPositionSwitch(clientHeight, HTMLHeight) {
        if (!document.querySelector(".footer")) return;
        Component.footerPosition.value = clientHeight < HTMLHeight;
    },

}

const Process: ProcessInterface = {
    ...Popup,
    ...Component
}

export default Process;