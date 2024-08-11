import {defineStore} from "pinia";
import {CacheUserItem} from "@/d.ts/api/system/user";
import {isDiffNow10Min} from "@/utils/computedTime";
import {reactive} from "vue";
import {getUserInfoBatch} from "@/api/system/user";


export type BaseUserItem = Pick<CacheUserItem, 'userId' | 'avatar' | 'nickname'>;
export const useUserCachedStore = defineStore("$userCache", () => {

        const userCachedList = reactive<Record<number, Partial<CacheUserItem>>>({});

        /**
         * 批量获取用户详细信息
         */
        const getBatchUserInfo = async (userIds: number[]) => {
            // 筛选出需要更新的用户
            const usersToUpdate = userIds
                .map((userId) => {
                    const cachedUser = userCachedList[userId];
                    return {userId, lastModifyTime: cachedUser?.lastModifyTime};
                })
                .filter(({lastModifyTime}) => !lastModifyTime || isDiffNow10Min(lastModifyTime));

            // 如果没有需要更新的用户，直接返回
            if (usersToUpdate.length === 0) {
                return;
            }

            // 批量获取用户信息
            getUserInfoBatch(usersToUpdate.map(({userId}) => userId)).then(({data}) => {
                data?.forEach((userInfo) => {
                    // 更新缓存中的用户信息
                    userCachedList[userInfo.id] = {
                        ...userInfo,
                        lastModifyTime: Date.now(), // 更新最后修改时间
                    };
                });
            });
            return
        };

        return {
            userCachedList,
            getBatchUserInfo,
        }
    }
)