<template>
  <div class="chat-message-list">
    <!--头部-->
    <div class="room-name">
      {{ chatStore.currentContactInfo?.name }}
      <span
          class="setting"
          @click="isShowSetting = true"
      >
      设置
    </span>
    </div>
    <el-drawer
        v-model="isShowSetting"
        title="设置"
        direction="rtl"
    >
      <span>Hi, there!</span>
    </el-drawer>

    <!--消息列表-->
  </div>
</template>

<script setup lang="ts">

import {useChatStore} from "@/store/im/chat";
import {ref} from "vue";

const chatStore = useChatStore();

const isShowSetting = ref<boolean>(false);

chatStore.getMessageList();

</script>

<style scoped lang="scss">
.chat-message-list {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;

  .room-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 10px;
    background: #fff;
    border-radius: 8px 8px 0 0;
    user-select: none;

    .setting {
      font-size: 13px;
      cursor: pointer;

      &:hover {
        color: var(--hover-primary);
      }
    }
  }
}
</style>