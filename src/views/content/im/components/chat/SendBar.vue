<template>
  <div class="chat-edit">
    <div class="reply-message-wrapper">
      云拼欲下星斗动，天乐一声肌骨寒。
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

      </div>
      <div class="chat-edit-input">

      </div>


    </div>
  </div>
</template>

<script setup lang="ts">

import Emoji from "@/components/general/emoji/Emoji.vue";
import {ref} from "vue";

const chooseEmoji = ref(false);

const addEmoji = (key: number) => {

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
    display: flex;
    align-items: center;
    padding: 4px 12px;
    margin-bottom: 4px;
    font-size: 12px;
    color: var(--font-light);
    white-space: pre-wrap;
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
  }

  .chat-edit-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 160px;
    font-size: 14px;

    .chat-edit-btn {
      width: 100%;
      height: 45px;
      display: flex;
      user-select: none;
      position: absolute;

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
  }
}


</style>