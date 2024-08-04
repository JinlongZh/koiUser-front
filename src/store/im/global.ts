import {defineStore} from "pinia";
import {reactive} from "vue";
import {RoomTypeEnum} from "@/config/constant";

export const useImGlobalStore = defineStore("$global", () => {
    const unReadMark = reactive<{ newFriendUnreadCount: number; newMessageUnreadCount: number }>({
        newFriendUnreadCount: 8,
        newMessageUnreadCount: 8,
    })

    const currentSession = reactive<{ roomId: number; type: RoomTypeEnum }>({
        roomId: 1,
        type: RoomTypeEnum.Group,
    })

    return {
        unReadMark,
        currentSession,
    }
})