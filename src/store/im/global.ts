import {defineStore} from "pinia";
import {reactive} from "vue";

export const useImGlobalStore = defineStore("$global", () => {
    const unReadMark = reactive<{ newFriendUnreadCount: number; newMessageUnreadCount: number }>({
        newFriendUnreadCount: 8,
        newMessageUnreadCount: 8,
    })

    return {
        unReadMark
    }
})