import {defineStore} from "pinia";
import {CacheUserItem} from "@/d.ts/api/system/user";
import {isDiffNow10Min} from "@/utils/computedTime";
import {reactive} from "vue";
import {getUserInfoBatch} from "@/api/system/user";


export type BaseUserItem = Pick<CacheUserItem, 'userId' | 'avatar' | 'nickname'>;
export const useUserCachedStore = defineStore("$userCache", () => {

        const userCachedList = reactive<Record<number, Partial<CacheUserItem>>>({});
        const pendingRequests: Record<number, Promise<void>> = {};

        /**
         * 批量获取用户详细信息
         */
        const getBatchUserInfo = async (userIds: number[]) => {
            // TODO 此处需要尽量保证数据的实时性
            // 筛选出需要更新的用户
            const usersToUpdate = userIds
                .map((userId) => {
                    const cachedUser = userCachedList[userId];
                    return {userId, lastModifyTime: cachedUser?.lastModifyTime};
                })
                .filter(({lastModifyTime}) => !lastModifyTime || isDiffNow10Min(lastModifyTime))
                .filter(({userId}) => !pendingRequests[userId]); // 过滤掉正在请求中的用户

            // 如果没有需要更新的用户，直接返回
            if (usersToUpdate.length === 0) {
                // 等待所有正在进行的请求完成
                await Promise.all(Object.values(pendingRequests));
                return;
            }

            // 为每个用户跟踪请求
            const request = getUserInfoBatch(usersToUpdate.map(({userId}) => userId)).then(({data}) => {
                data?.forEach((userInfo) => {
                    // 更新缓存中的用户信息
                    userCachedList[userInfo.id] = {
                        ...userInfo,
                        lastModifyTime: Date.now(), // 更新最后修改时间
                    };
                });
            }).finally(() => {
                // 请求完成后，从跟踪列表中移除
                usersToUpdate.forEach(({userId}) => {
                    delete pendingRequests[userId];
                });
            });

            // 将请求添加到跟踪列表中
            usersToUpdate.forEach(({userId}) => {
                pendingRequests[userId] = request;
            });

            await request;
        };

        return {
            userCachedList,
            getBatchUserInfo,
        }
    }
)