import {defineStore} from "pinia";
import {reactive} from "vue";
import {ContactRoomResp} from "@/d.ts/api/chat/chat";
import {getContactPage} from "@/api/chat/chat";

export const pageSize = 20

export const useChatStore = defineStore('$chat', () => {

    // 会话列表
    const contactList = reactive<ContactRoomResp[]>([]);
    const contactOptions = reactive({isLast: false, isLoading: false, page: 1});

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


    // 会话列表去重并排序
    const sortAndUniqueContactList = () => {
        const temp: Record<string, ContactRoomResp> = {}
        contactList.forEach((item) => (temp[item.roomId] = item))
        contactList.splice(0, contactList.length, ...Object.values(temp))
        contactList.sort((pre, cur) => cur.activeTime - pre.activeTime)
    }


    return {
        contactList,
        contactOptions,
        getContactList
    }

})