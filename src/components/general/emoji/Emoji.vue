<template>
  <div v-show="chooseEmoji" class="emoji-wrapper">
    <span
        class="emoji-item"
        v-for="(value, key, index) of emojiList"
        :key="index"
        @click="addEmoji(key)"
    >
      <img
          :src="value"
          alt=""
          class="emoji"
          width="24"
          height="24"
      >
    </span>
  </div>
</template>

<script setup lang="ts">
import EmojiList from "@/assets/images/emoji/emoji"
import {defineEmits, defineProps} from "vue";

const props = defineProps(["chooseEmoji"]);

const emit = defineEmits(["addEmoji"]);

const emojiList = EmojiList;

const addEmoji = (key: number) => {
  emit("addEmoji", key);
}


</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.emoji-wrapper {
  width: 80%;
  max-height: 150px;
  overflow-y: auto;

  .emoji-item {
    cursor: pointer;
    display: inline-block;

    .emoji {
      user-select: none;
      margin: 0.25rem;
      display: inline-block;
      vertical-align: middle;
    }
  }

  .emoji-item:hover {
    transition: all 0.2s;
    border-radius: 0.25rem;
    background: #dddddd;
  }
}
</style>