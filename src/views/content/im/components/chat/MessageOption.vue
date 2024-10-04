<script setup lang="ts">

import {useChatStore} from "@/store/im/chat";
import type {MessageType} from "@/d.ts/api/chat/chat";
import SvgIcon from "@/components/general/icon/SvgIcon.vue";

const props = defineProps<{ message: MessageType }>()

const chatStore = useChatStore()

/**
 * 回复消息
 */
const onReplyMsg = async (messageFromUser: MessageType) => {
  if (!messageFromUser) {
    return;
  }
  chatStore.currentMessageReply = messageFromUser;
}
</script>

<template>
  <div class="msg-option" v-if="!message.loading">
    <span class="msg-option-item" title="回复">
      <svg-icon style="font-size: 14px" icon-class="reply" @click="onReplyMsg(message)"/>
    </span>

  </div>
</template>

<style lang="scss" scoped>
.msg-option {
  display: inline-flex;
  padding: 2px 4px;

  .msg-option-item {
    display: inline-flex;
    align-items: center;
    padding: 0 4px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: var(--background-dark);
    }
  }
}

</style>
