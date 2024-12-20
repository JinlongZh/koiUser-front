import {defineStore} from "pinia";
import {computed, reactive, ref, watch} from "vue";
import {ContactRoomResp, MessageType} from "@/d.ts/api/chat/chat";
import {getContactDetail, getContactPage, getMessagePage, readMessage} from "@/api/chat/chat";
import {useImGlobalStore} from "@/store/im/global";
import {computedTimeBlock, formatStampToString, formatStringToStamp} from "@/utils/computedTime";
import {RoomTypeEnum} from "@/config/constant";
import {useUserCachedStore} from "@/store/cache/userCache";
import cloneDeep from 'lodash/cloneDeep';
import {useRoute} from "vue-router";

export const pageSize = 20;

export const useChatStore = defineStore('$chat', () => {
    const route = useRoute();

    const globalStore = useImGlobalStore();
    const userCacheStore = useUserCachedStore();

    /**
     * 会话列表
     */
    const contactList = reactive<ContactRoomResp[]>([]);
    const contactOptions = reactive({isLast: false, isLoading: false, page: 1});

    const currentRoomId = computed(() => globalStore.currentContact?.roomId)
    const currentRoomType = computed(() => globalStore.currentContact?.type)

    /**
     * 消息Map(roomId(messageId, Message))
     */
    const messageMap = reactive<Map<number, Map<number, MessageType>>>(
        new Map([[currentRoomId.value, new Map()]]),
    )
    /**
     * 消息加载状态(roomId(isLast, isLoading, cursor))
     */
    const messageOptions = reactive<Map<number, {
        isLast: boolean;
        isLoading: boolean;
        pageNo: number
    }>>(new Map([[currentRoomId.value, {
        isLast: false,
        isLoading: false,
        pageNo: 1,
    }]]))
    /**
     * 回复消息映射
     */
    const replyMapping = reactive<Map<number, Map<number, number[]>>>(
        new Map([[currentRoomId.value, new Map()]]),
    )

    /**
     * 当前消息操作方法
     */
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
    /**
     * 将消息列表转换为数组
     */
    const chatMessageList = computed(() => [...(currentMessageMap.value?.values() || [])]);

    /**
     * 当前消息回复
     */
    const currentMessageReply = ref<Partial<MessageType>>({});

    /**
     * 当前消息操作方法
     */
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

    /**
     * 新消息计数
     */
    const newMessageCount = reactive<Map<number, { count: number; isStart: boolean }>>(
        new Map([
            [
                currentRoomId.value,
                {
                    // 新消息计数
                    count: 0,
                    // 是否开始计数
                    isStart: false,
                },
            ],
        ]),
    )
    /**
     * 当前新消息计数
     */
    const currentNewMessageCount = computed({
        get: () => {
            const current = newMessageCount.get(currentRoomId.value as number);
            if (current === undefined) {
                newMessageCount.set(currentRoomId.value, {count: 0, isStart: false});
            }
            return newMessageCount.get(currentRoomId.value as number);
        },
        set: (val) => {
            newMessageCount.set(currentRoomId.value, val as { count: number; isStart: boolean });
        },
    })

    /**
     * 清除新消息数量
     */
    const clearNewMessageCount = () => {
        if (currentNewMessageCount.value) {
            currentNewMessageCount.value.count = 0;
        }
    }

    /**
     * 获取会话列表
     *
     * @param isFresh
     */
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

    /**
     * 获取消息列表
     *
     * @param size
     */
    const getMessageList = async (size = pageSize) => {
        if (currentMessageOptions.value) {
            currentMessageOptions.value.isLoading = true;
        }
        //  已是最后一页，则直接返回
        if (currentMessageOptions.value.isLast) {
            return;
        }
        try {
            const pageNo = currentMessageOptions.value.pageNo;
            await getMessagePage({
                pageNo: pageNo,
                pageSize: size,
                roomId: currentRoomId.value,
            }).then(({data}) => {
                const computedList = computedTimeBlock(data.list);
                // 收集需要请求用户详情的userId
                const userIdCollectSet: Set<number> = new Set() // 去重用
                computedList.forEach((msg) => {
                    // 查询消息发送者的信息
                    userIdCollectSet.add(msg.fromUser.userId);
                })

                // 获取用户信息缓存
                userCacheStore.getBatchUserInfo([...userIdCollectSet]);

                // 为保证获取的历史消息在前面
                const newList = [...computedList, ...chatMessageList.value]
                currentMessageMap.value?.clear() // 清空Map
                newList.forEach((msg) => {
                    currentMessageMap.value?.set(msg.message.id, msg)
                })

                // 判断是否还有更多消息
                if (data.total <= pageNo * size) {
                    currentMessageOptions.value.isLast = true;
                } else {
                    currentMessageOptions.value.pageNo++;
                }

            })

        } finally {
            if (currentMessageOptions.value) {
                currentMessageOptions.value.isLoading = false;
            }
        }
    }

    /**
     * 推送消息
     *
     * @param messageType
     */
    const pushMessage = async (messageType: MessageType) => {
        const messageId = messageType.message.id;
        const roomId = messageType.message.roomId;
        if (!messageId || !roomId) {
            console.log("消息id或房间id错误, messageId: " + messageId + ", roomId: " + roomId);
            return;
        }
        // 将新消息放入Map中
        const current = messageMap.get(roomId);
        current?.set(messageId, messageType);

        // 发完消息就要刷新会话列表，如果当前会话已经置顶了，可以不用刷新
        getContactDetail(roomId).then(({data}) => {
            updateContactLastActiveTime(roomId, data);
        });

        // 聊天记录计数
        if (currentRoomId.value !== messageType.message.roomId) {
            // 总的未读数增加
            globalStore.unReadMark.newMessageUnreadCount++;

            // 如果当前会话不是当前聊天窗口，则增加未读数
            const item = contactList.find(
                (item) => item.roomId === messageType.message.roomId
            );
            if (item) {
                item.unreadCount += 1;
            }
        } else {
            // 如果新消息的 roomId 和 当前显示的 room 的 Id 一致，且当前路由在聊天内, 就更新已读
            if (route?.path && route?.path === '/chat') {
                readMessage({
                    roomId: currentRoomId.value
                })
            }
        }

        if (currentNewMessageCount.value && currentNewMessageCount.value?.isStart) {
            currentNewMessageCount.value.count++;
            return;
        }

        // 聊天列表滚动到底部
        setTimeout(() => {
            // TODO 如果超过一屏了，不自动滚动到最新消息
            chatListToBottomAction.value?.();
        }, 0)
    }

    /**
     * 更新会话列表最后活跃时间
     *
     * @param roomId
     * @param room
     */
    const updateContactLastActiveTime = (roomId: number, room?: ContactRoomResp) => {
        const contact = contactList.find((item) => item.roomId === roomId);
        // 如果已经存在当前会话，则直接更新，否则根据后端返回的room插入
        if (contact && contact) {
            Object.assign(contact, {activeTime: formatStampToString(Date.now()), text: room.text});
        } else if (contact) {
            Object.assign(contact, {activeTime: formatStampToString(Date.now())});
        } else if (room) {
            const newItem = cloneDeep(room);
            newItem.activeTime = Date.now();
            contactList.unshift(newItem);
        }
        // 排序并去重
        sortAndUniqueContactList();
    }

    /**
     * 消息列表阅读，并返回未读数
     *
     * @param roomId
     * @constructor
     */
    const readContact = (roomId: number): number => {
        const contact = contactList.find((item) => item.roomId === roomId);
        const unreadCount = contact?.unreadCount || 0;
        if (contact) {
            contact.unreadCount = 0;
        }
        return unreadCount;
    }


    /**
     * 根据消息id获取消息体
     *
     * @param messageId
     */
    const getMessage = (messageId: number) => {
        return currentMessageMap.value?.get(messageId);
    }

    /**
     * 加载更多消息
     *
     * @param size
     */
    const loadMore = async (size?: number) => {
        if (currentMessageOptions.value?.isLast || currentMessageOptions.value?.isLoading) {
            return;
        }
        await getMessageList(size);
    }


    /**
     * 获取当前会话信息
     */
    const currentContactInfo = computed(() =>
        contactList.find((contact) => contact.roomId === globalStore.currentContact.roomId),
    )

    /**
     * 外部提供消息列表滚动到底部事件
     */
    const chatListToBottomAction = ref<() => void>();


    /**
     * 会话列表去重并排序
     */
    const sortAndUniqueContactList = () => {
        const temp: Record<string, ContactRoomResp> = {};
        contactList.forEach((item) => (temp[item.roomId] = item))
        contactList.splice(0, contactList.length, ...Object.values(temp))
        contactList.sort((pre, cur) => formatStringToStamp(cur.activeTime) - formatStringToStamp(pre.activeTime))
    }

    /**
     * 切换会话时触发
     */
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
        currentMessageReply.value = {};
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
        newMessageCount,
        currentNewMessageCount,
        clearNewMessageCount,
        getContactList,
        getMessageList,
        pushMessage,
        readContact,
        getMessage,
        loadMore,
        currentContactInfo,
        chatListToBottomAction
    }

})