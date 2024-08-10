import {defineStore} from "pinia";
import {computed, reactive, ref, watch} from "vue";
import {ContactRoomResp, MessageType} from "@/d.ts/api/chat/chat";
import {getContactPage, getMessagePage} from "@/api/chat/chat";
import {useImGlobalStore} from "@/store/im/global";
import {computedTimeBlock} from "@/d.ts/utils/computedTime";
import {RoomTypeEnum} from "@/config/constant";

export const pageSize = 20;

const globalStore = useImGlobalStore();

export const useChatStore = defineStore('$chat', () => {

    // 会话列表
    const contactList = reactive<ContactRoomResp[]>([]);
    const contactOptions = reactive({isLast: false, isLoading: false, page: 1});

    const currentRoomId = computed(() => globalStore.currentContact?.roomId)
    const currentRoomType = computed(() => globalStore.currentContact?.type)

    // 消息Map(roomId(messageId, Message))
    const messageMap = reactive<Map<number, Map<number, MessageType>>>(
        new Map([[currentRoomId.value, new Map()]]),
    )
    // 消息加载状态(roomId(isLast, isLoading, cursor))
    const messageOptions = reactive<Map<number, { isLast: boolean; isLoading: boolean; pageNo: number }>>(new Map([[currentRoomId.value, {
        isLast: false,
        isLoading: false,
        pageNo: 1,
    }]]))
    // 回复消息映射
    const replyMapping = reactive<Map<number, Map<number, number[]>>>(
        new Map([[currentRoomId.value, new Map()]]),
    )

    const currentMessageMap = computed({
        get: () => {
            const current = messageMap.get(currentRoomId.value as number)
            if (current === undefined) {
                messageMap.set(currentRoomId.value, new Map())
            }
            return messageMap.get(currentRoomId.value as number)
        },
        set: (val) => {
            messageMap.set(currentRoomId.value, val as Map<number, MessageType>)
        },
    })
    // 将消息列表转换为数组
    const chatMessageList = computed(() => [...(currentMessageMap.value?.values() || [])]);

    // 当前消息回复
    const currentMessageReply = ref<Partial<MessageType>>({});

    const currentMessageOptions = computed({
        get: () => {
            const current = messageOptions.get(currentRoomId.value as number)
            if (current === undefined) {
                messageOptions.set(currentRoomId.value, {isLast: false, isLoading: true, pageNo: 1})
            }
            return messageOptions.get(currentRoomId.value as number)
        },
        set: (val) => {
            messageOptions.set(
                currentRoomId.value,
                val as { isLast: boolean; isLoading: boolean; pageNo: number },
            )
        },
    })

    // 获取会话列表
    const getContactList = async (isFresh = false) => {
        // 如果不需要刷新，并且 session 正在加载或已是最后一页，则直接返回
        if (!isFresh && (contactOptions.isLast || contactOptions.isLoading)) {
            return;
        }
        contactOptions.isLoading = true

        getContactPage({
            pageNo: isFresh ? 1 : contactOptions.page,
            pageSize: contactList.length > pageSize ? contactList.length : pageSize,
        }).then(({data}) => {
            if (isFresh) {
                contactList.splice(0, contactList.length, ...data.list)
            } else {
                contactList.push(...data.list)
            }
            contactOptions.page++;
            contactOptions.isLast = data.total <= contactList.length
            contactOptions.isLoading = false
        })
        sortAndUniqueContactList();
    }

    // 获取消息列表
    const getMessageList = async (size = pageSize) => {
        if (currentMessageOptions.value) {
            currentMessageOptions.value.isLoading = true;
        }
        try {
            await getMessagePage({
                pageNo: currentMessageOptions.value.pageNo,
                pageSize: size,
                roomId: currentRoomId.value,
            }).then(({data}) => {
                const computedList = computedTimeBlock(data.list);
                // 为保证获取的历史消息在前面
                const newList = [...computedList, ...chatMessageList.value]
                currentMessageMap.value?.clear() // 清空Map
                newList.forEach((msg) => {
                    currentMessageMap.value?.set(msg.message.id, msg)
                })
            })

        } finally {
            if (currentMessageOptions.value) {
                currentMessageOptions.value.isLoading = false;
            }
        }
    }

    // 根据消息id获取消息体
    const getMessage = (messageId: number) => {
        return currentMessageMap.value?.get(messageId);
    }

    /**
     * 获取当前会话信息
     */
    const currentContactInfo = computed(() =>
        contactList.find((contact) => contact.roomId === globalStore.currentContact.roomId),
    )

    // 外部提供消息列表滚动到底部事件
    const chatListToBottomAction = ref<() => void>();


    // 会话列表去重并排序
    const sortAndUniqueContactList = () => {
        const temp: Record<string, ContactRoomResp> = {}
        contactList.forEach((item) => (temp[item.roomId] = item))
        contactList.splice(0, contactList.length, ...Object.values(temp))
        contactList.sort((pre, cur) => cur.activeTime - pre.activeTime)
    }

    // 切换会话
    watch(currentRoomId, (val, oldVal) => {
        if (oldVal !== undefined && val !== oldVal) {
            // 切换会话，滚动到底部
            chatListToBottomAction.value?.();
            // 切换的 rooms是空数据的话就请求消息列表
            if (!currentMessageMap.value || currentMessageMap.value.size === 0) {
                if (!currentMessageMap.value) {
                    messageMap.set(currentRoomId.value as number, new Map())
                }
                getMessageList();
            }

            // 群组的时候去请求
            if (currentRoomType.value === RoomTypeEnum.Group) {
                // groupStore.getGroupUserList(true)
                // groupStore.getCountStatistic()
                // cachedStore.getGroupAtUserBaseInfo()
            }
        }

        // 重置当前回复的消息
        currentMessageReply.value = {}
    })


    return {
        contactList,
        contactOptions,
        currentRoomId,
        currentRoomType,
        messageMap,
        messageOptions,
        replyMapping,
        currentMessageMap,
        chatMessageList,
        currentMessageReply,
        currentMessageOptions,
        getContactList,
        getMessageList,
        getMessage,
        currentContactInfo,
        chatListToBottomAction
    }

})