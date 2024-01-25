import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {UserInfo} from "@/d.ts/api/system/user";

const useUserStore = defineStore("$user", () => {
    const userInfo = ref<UserInfo>({});

    const status = ref<number>(0);

    const initUserInfo = (data: UserInfo) => {
        userInfo.value = data;
    }

    const isLoggedIn = computed(() => {
        return Boolean(userInfo.value.id);
    });


    return {
        userInfo,
        status,
        initUserInfo,
        isLoggedIn,
    }
})

export default useUserStore;