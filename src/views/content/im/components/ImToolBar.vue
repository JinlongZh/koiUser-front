<template>
  <div class="im-side-toolbar">
    <el-avatar :src="userStore.userInfo.avatar" :size="50"/>
    <div class="im-tool-icons">
      <!-- 会话 -->
      <router-link class="im-tool-icon" exactActiveClass="im-tool-icon-active" :to="publicPath.chat">
        <el-badge
            :value="unReadMark.newMessageUnreadCount"
            :hidden="unReadMark.newMessageUnreadCount === 0"
            :max="99"
        >
          <svg-icon icon-class="chat" style="width: 28px; height: 28px;"/>
        </el-badge>
      </router-link>
      <!-- 联系人 -->
      <router-link v-if="userStore.isLoggedIn" class="im-tool-icon" exactActiveClass="im-tool-icon-active"
                   :to="publicPath.contacts">
        <el-badge
            :value="unReadMark.newFriendUnreadCount"
            :hidden="unReadMark.newFriendUnreadCount === 0"
            :max="99"
        >
          <svg-icon icon-class="contact" style="width: 28px; height: 28px;"/>
        </el-badge>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/user";
import SvgIcon from "@/components/general/icon/SvgIcon.vue";
import {useImGlobalStore} from "@/store/im/global";
import {computed} from "vue";
import {publicPath} from "@/router/path";

const userStore = useUserStore();
const imGlobalStore = useImGlobalStore();
const unReadMark = computed(() => imGlobalStore.unReadMark);
</script>

<style scoped lang="scss">
.im-side-toolbar {
  width: 80px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  border-right: 1px solid #e6e6e6;
  background: #fff;

  .im-tool-icons {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    margin-top: 16px;
    border-radius: 8px;
    color: black;

    .im-tool-icon-active {
      color: #fff;
      background-color: #49b1f5;
      border-radius: 8px;
    }

    .im-tool-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 8px;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        color: #fff;
        background-color: #49b1f5;
      }
    }
  }


}
</style>