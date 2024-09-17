<template>
  <div class="chat-box">
    <div class="chat-wrapper">
      <div v-if="hasSelectContact" class="chat">
        <ChatList/>
        <SendBar/>
      </div>
      <MyEmpty
        v-else
        style="width: 100%; height: 100%;"
        description="请选择联系人或群聊"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import ChatList from "@/views/content/im/components/chat/ChatList.vue";
import SendBar from "@/views/content/im/components/chat/SendBar.vue";
import {computed} from "vue";
import {useImGlobalStore} from "@/store/im/global";
import MyEmpty from "@/components/general/image/MyEmpty.vue";

const globalStore = useImGlobalStore();

const hasSelectContact = computed(() => {
  return globalStore.currentContact.roomId !== 0;
})

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