import {defineStore} from "pinia";
import {ref} from "vue";
import type {UserInfo} from "@/d.ts/api/user";

const useUserStore = defineStore("$user", () => {
    const userInfo = ref<UserInfo>({});

    const status = ref<number>(0);

    const initUserInfo = (data: UserInfo) => {
        userInfo.value = data;
    }


    return {
        userInfo,
        status,
        initUserInfo,
    }
})

export default useUserStore;