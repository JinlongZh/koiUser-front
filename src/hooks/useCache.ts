import {computed, ComputedRef, Ref, toValue} from "vue";
import {useUserCachedStore} from "@/store/cache/userCache";

/**
 * 统一获取用户信息 hook
 * @param userId 用户 ID
 * @description 引入该Hook后，可响应式获取用户信息
 */
export const useUserInfo = (userId?: number | ComputedRef<number | undefined> | Ref<number>) => {
    const cachedStore = useUserCachedStore();
    const userInfo = computed(() => (userId && cachedStore.userCachedList[toValue(userId as number)]) || {});
    // 如果没有就请求
    const resultUserId = toValue(userId as number);
    if (resultUserId && Object.keys(userInfo.value).length === 0) {
        cachedStore.getBatchUserInfo([resultUserId]);
    }
    return userInfo;
}