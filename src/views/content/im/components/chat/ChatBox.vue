<template>
  <div class="chat-box">
    <div class="chat-wrapper">
      <div class="chat">
        <ChatList />
        <SendBar />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import ChatList from "@/views/content/im/components/chat/ChatList.vue";
import SendBar from "@/views/content/im/components/chat/SendBar.vue";


</script>

<style scoped lang="scss">

.chat-box {
  display: flex;
  flex: 1;
  align-items: stretch;
  overflow: hidden;

  .chat-wrapper {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    .chat {
      display: flex;
      flex: 1;
      flex-direction: column;
      height: 100%;
      border-radius: 8px;
    }
  }

}

</style>