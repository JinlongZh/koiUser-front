<template>
  <div class="chat-edit">
    <div v-show="Object.keys(currentMessageReply).length" class="reply-message-wrapper">
      <div class="reply-message-content">
        <div class="reply-people-name">
          {{ currentMessageReply.fromUser?.userId }}
        </div>
        <div class="reply-message-text">
          {{ currentMessageReply.message?.body }}
        </div>
      </div>
      <svg-icon class="reply-message-close" @click="closeReply" icon-class="close"></svg-icon>
    </div>
    <div class="chat-edit-box">
      <div class="chat-edit-btn">
        <span
            :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'"
            @click="chooseEmoji = !chooseEmoji"
        >
         <i class="iconfont iconbiaoqing"/>
        </span>
        <div class="chat-edit-emoji" v-show="chooseEmoji">
          <Emoji
              :chooseEmoji="chooseEmoji"
              @addEmoji="addEmoji"
          />
        </div>

        <!--  输入内容-->
      </div>
      <div class="chat-edit-input">
        <ChatMessageInput
            ref="mentionRef"
            v-model="inputMessage"
            :mentions="mentionList"
            :maxLength="500"
            @change="onInputChange"
            @send="sendMessageHandler"
        />
      </div>

      <div class="chat-edit-submit">
        <span style="font-size: 14px; color: #b3b3b3; margin-right: 10px">Ctrl+Enter：换行 | Enter：发送</span>
        <button class="k-btn k-btn-primary" @click="sendMessageHandler">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import Emoji from "@/components/general/emoji/Emoji.vue";
import {inject, ref, computed} from "vue";
import ChatMessageInput from "@/views/content/im/components/input/ChatMessageInput.vue";
import {IMention} from "@/views/content/im/components/input/type";
import {MessageEnum} from "@/config/constant";
import {sendMessage} from "@/api/chat/chat";
import {useImGlobalStore} from "@/store/im/global";
import {useChatStore} from "@/store/im/chat";
import type {ProcessInterface} from "@/d.ts/modules/process";
import {ElInput} from "element-plus";
import SvgIcon from "@/components/general/icon/SvgIcon.vue";
import useUserStore from "@/store/user";

const $process = inject<ProcessInterface>("$process")!;

const mentionRef = ref<typeof ElInput>()

const globalStore = useImGlobalStore();
const chatStore = useChatStore();
const useStore = useUserStore();

const chooseEmoji = ref(false);
const mentionList = ref<IMention[]>([])
const inputMessage = ref("");
const isSending = ref(false);

const currentMessageReply = computed(() => (
    useStore.isLoggedIn && chatStore.currentMessageReply) || {}
);

const addEmoji = (key: number) => {

}

// 输入消息有变化
const onInputChange = (val: string, mentions: IMention[]) => {
  mentionList.value = mentions;
}

// 消息发送处理器
const sendMessageHandler = () => {
  // 空消息或正在发送时禁止发送
  if (!inputMessage.value?.trim().length) {
    $process.tipShow.error("请输入消息内容");
    return;
  }

  if (isSending.value) {
    $process.tipShow.error("消息正在发送");
    return;
  }

  isSending.value = true;
  send(MessageEnum.TEXT, {
    content: inputMessage.value,
    replyMessageId: currentMessageReply.value.message?.id,
    atUserIdList: mentionList.value.map((item) => item.userId),
  })
}

// 发送消息
const send = (messageType: MessageEnum, body: any) => {
  sendMessage({
    roomId: globalStore.currentContact.roomId,
    messageType: messageType,
    body
  }).then(({data}) => {
    if (data.message.type === MessageEnum.TEXT) {
      chatStore.pushMessage(data) // 消息列表新增一条消息
    } else {

    }
    // 清空输入列表
    inputMessage.value = '';

  }).finally(() => {
    isSending.value = false;
    // 输入框重新获取焦点
    focusMessageInput(); // 输入框重新获取焦点
    // 滚动到消息列表底部
    chatStore.chatListToBottomAction?.();
  })
}

/**
 * 输入框重新获取焦点
 */
const focusMessageInput = () => {
  setTimeout(() => {
    if (!mentionRef.value) {
      return;
    }
    mentionRef.value?.focus?.();
    const selection = mentionRef.value?.range?.selection as Selection;
    selection?.selectAllChildren(mentionRef.value.input);
    selection?.collapseToEnd();
  })
}

/**
 * 关闭回复框
 */
const closeReply = () => {
  chatStore.currentMessageReply = {};
}


</script>

<style scoped lang="scss">

.chat-edit {
  width: 100%;
  position: relative;
  padding: 0 16px;
  word-break: break-all;
  background-color: #fff;
  border-bottom-right-radius: 8px;
  border-top: 1px solid #d8d8d8;

  .reply-message-wrapper {
    width: 100%;
    padding: 4px 12px;
    margin-bottom: 4px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      display: inline-block;
      width: 3px;
      height: 90%;
      background: #d8d8d8;
      margin-right: 8px;
    }

    .reply-message-content {
      width: 95%;
      font-size: 12px;
      color: var(--font-light);

      .reply-people-name {
        margin-bottom: 5px;
      }

      .reply-message-text {
        white-space: pre-wrap;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
      }

    }


    .reply-message-close {
      position: absolute;
      font-size: 20px;
      color: #666;
      top: 10px;
      right: 1px;
      cursor: pointer;
    }
  }

  .chat-edit-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 160px;
    font-size: 14px;

    .chat-edit-btn {
      width: 100%;
      height: 40px;
      display: flex;
      user-select: none;
      position: relative;

      .chat-edit-emoji {
        width: 300px;
        height: 150px;
        position: absolute;
        top: -150px;

        background: #fff;
        border-radius: 4px;
        border: 1px solid #d8d8d8;
      }
    }

    .chat-edit-input {
      width: 100%;
      height: 75px;
    }

    .chat-edit-submit {
      height: 45px;
      width: 100%;
      margin: 8px 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}


</style>