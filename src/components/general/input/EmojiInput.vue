<template>
  <div class="emoji-input">
    <textarea
        class="emoji-textarea"
        id="emoji-textarea"
        placeholder="登录后才可以发表评论哦..."
        v-model="text"
        @blur="changeValue"
        maxlength="500"
    ></textarea>
    <div class="emoji-container">
      <span
          :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'"
          @click="handleChooseEmoji()"
      >
        <i class="iconfont iconbiaoqing"/>
      </span>

    </div>
    <Emoji
        :chooseEmoji="chooseEmoji"
        @addEmoji="addEmoji"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Emoji from "@/components/general/emoji/Emoji.vue";

const emit = defineEmits(["changeValue"]);

let text = ref("");
let chooseEmoji = ref(false);

const changeValue = () => {
  emit("changeValue", text.value);
}

const addEmoji = (key: number) => {
  // 添加表情就获取焦点，不然添加表情后不触发@blur事件
  let inputBox = document.getElementById("emoji-textarea");
  if (document.activeElement !== inputBox) {
    // 获取焦点
    inputBox.focus();
  }
  text.value += key;
}

const handleChooseEmoji = () => {
  chooseEmoji.value = !chooseEmoji.value;
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.emoji-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(144, 147, 153, .31);
  border-radius: 4px;
  background: #fff url("@/assets/images/commentBack.webp") no-repeat 100% 100%;

  .emoji-textarea {
    width: 100%;
    font-size: 0.875rem;
    outline: none;
    padding: 1.5rem 1rem;
    min-height: 122px;
    resize: none;
    border-radius: 4px;
    mix-blend-mode: multiply;
  }

  .emoji-container {
    margin: 10px;
    display: flex;
    align-items: center;
  }
}
</style>