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
    <VirtualList
        v-if="chatMessageList?.length"
        ref="virtualListRef"
        class="virtual-list scroll-hover"
        dataPropName="messageData"
        :data="chatMessageList"
        :data-key="getKey"
        :item="MessageItem"
        :size="20"
        @totop="onToTop"
        @scroll="onScroll"
        @ok="goToBottom"
    />
  </div>
</template>

<script setup lang="ts">

import {useChatStore} from "@/store/im/chat";
import {computed, ref} from "vue";
import VirtualList from "@/components/content/VirtualList";
import {MessageType} from "@/d.ts/api/chat/chat";
import throttle from 'lodash/throttle';
import MessageItem from "@/views/content/im/components/chat/MessageItem.vue";

const chatStore = useChatStore();
const virtualListRef = ref()
const messageOptions = computed(() => chatStore.currentMessageOptions);
const chatMessageList = computed(() => chatStore.chatMessageList);
const currentNewMessageCount = computed(() => chatStore.currentNewMessageCount);

const isShowSetting = ref<boolean>(false);

const getKey = (item: MessageType) => item.message.id;

// 到顶部时触发函数 记录旧的滚动高度，加载更多消息后滚动回加载时那条消息的位置
const onToTop = async () => {
  if (messageOptions.value?.isLoading) {
    return;
  }
  const oldIndex = virtualListRef.value.getSizes();
  await chatStore.loadMore();
  virtualListRef.value.scrollToIndex(virtualListRef.value.getSizes() - oldIndex);
}

// 滚动时触发函数，主要处理新消息提示
const onScroll = throttle((eventData) => {
  const {offset, clientSize, scrollSize} = eventData;

  if (!offset || !clientSize || !scrollSize) {
    return;
  }

  // 是否已滚动到底部最后一个可视范围内
  const isScrollEnd = offset + clientSize >= scrollSize - clientSize;
  if (isScrollEnd) {
    currentNewMessageCount.value && (currentNewMessageCount.value.isStart = false);
    chatStore.clearNewMessageCount();
  } else {
    currentNewMessageCount.value && (currentNewMessageCount.value.isStart = true);
  }
}, 100)

// 回到底部
const goToBottom = () => {
  if (virtualListRef.value) {
    virtualListRef.value.scrollToBottom();
    chatStore.clearNewMessageCount();
  }
}

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
    min-height: 50px;
    padding: 0 10px;
    background: #fff;
    border-radius: 0 8px 0 0;
    border-bottom: 1px solid #d8d8d8;
    user-select: none;

    .setting {
      font-size: 13px;
      cursor: pointer;

      &:hover {
        color: var(--hover-primary);
      }
    }
  }

  .virtual-list {
    position: relative;
    width: 100%;
    height: 100%; // 100%时谷歌浏览器会出现无法滚动问题
    padding-right: 20px;
    padding-left: 20px;
    overflow-y: auto;
  }
}
</style>