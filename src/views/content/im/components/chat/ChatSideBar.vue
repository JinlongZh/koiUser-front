<template>
  <div class="chat-message">
    <ul v-infinite-scroll="load" :infinite-scroll-immediate="false">
      <li
          v-for="(item, index) in contactList"
          :key="index"
          :data-room-id="item.roomId"
          :class="['chat-message-item', { active: currentSession.roomId === item.roomId }]"
      >
        <div class="item-wrapper">
          <el-badge :value="item.unreadCount" :max="999" :hidden="item.unreadCount < 1" class="item">
            <el-avatar shape="circle" :size="38" :src="item.avatar"/>
          </el-badge>
          <div class="message-info">
            <div style="white-space: nowrap">
              <span class="person">{{ item.name }}</span>
              <span class="tag">{{ item.tag }}</span>
            </div>
            <div class="message-message">{{ item.text }}</div>
          </div>
          <span class="message-time">{{ item.lastMessageTime }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import {computed, onBeforeMount} from "vue";
import {useChatStore} from "@/store/im/chat";
import {useImGlobalStore} from "@/store/im/global";
import {formatTime} from "@/d.ts/utils/computedTime";

const chatStore = useChatStore();
const globalStore = useImGlobalStore();

onBeforeMount(() => {
  chatStore.getContactList();
})

const currentSession = computed(() => {
  return globalStore.currentSession;
})

const contactList = computed(() => {
  return chatStore.contactList.map(item => {
    return {
      ...item,
      tag: "官方",
      lastMessageTime: formatTime(item.activeTime),
    }
  });
})

// 加载更多
const load = () => {
  console.log("load")
}


</script>

<style scoped lang="scss">

.chat-message {
  width: 280px;
  height: 100%;
  background: #fff;

  ul {
    padding: 0;
    margin: 20px 10px;
    user-select: none;

    li {
      height: 60px;
      padding: 0 10px;
      cursor: pointer;
      background-color: #fff;
      border-radius: 8px;
      list-style-type: none;

      .item-wrapper {
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        pointer-events: none;

        .message-info {
          height: 100%;
          padding: 5px 10px;
          margin-right: auto;

          .person {
            font-size: 16px;
          }

          .tag {
            display: inline-block;
            padding: 1px 4px;
            margin-left: 4px;
            font-size: 12px;
            font-weight: bold;
            color: var(--color-gold);
            background-color: var(--background-4);
            border-radius: 4px;
            transform: scale(0.8);
          }

          .message-message {
            display: -webkit-box;
            width: 100%;
            margin-top: 5px;
            overflow: hidden;
            font-size: 12px;
            color: var(--font-light);
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            word-break: break-word;
          }
        }

        .message-time {
          margin-bottom: auto;
          margin-top: 5px;
          font-size: 12px;
          color: var(--font-light);
          white-space: nowrap;
        }
      }
    }
  }
}

</style>