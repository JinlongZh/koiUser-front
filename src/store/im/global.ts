import {defineStore} from "pinia";
import {reactive, watch} from "vue";
import {RoomTypeEnum} from "@/config/constant";
import {readMessage} from "@/api/chat/chat";
import {useChatStore} from "@/store/im/chat";

export const useImGlobalStore = defineStore("$imGlobal", () => {

    const chatStore = useChatStore();

    /**
     * 总体未读数标记
     */
    const unReadMark = reactive<{ newFriendUnreadCount: number; newMessageUnreadCount: number }>({
        newFriendUnreadCount: 8,
        newMessageUnreadCount: 99,
    })

    /**
     * 当前聊天列表
     */
    const currentContact = reactive<{ roomId: number; type: RoomTypeEnum }>({
        roomId: 0,
        type: RoomTypeEnum.Group,
    })

    /**
     * 切换会话的时候重置消息已读数查询
     */
    watch(currentContact, (val) => {
        // 标记房间最新消息已读
        readMessage({
            roomId: val.roomId
        })
        const unreadCount = chatStore.readContact(val.roomId);
        const resultCount = unReadMark.newMessageUnreadCount - unreadCount;
        unReadMark.newMessageUnreadCount = resultCount > 0 ? resultCount : 0;
    })

    return {
        unReadMark,
        currentContact,
    }
})