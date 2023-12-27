<template>
  <div class="comment-input">
    <EmojiInput @changeValue="changeValue"/>
    <div class="publish-box">
      <button class="k-btn k-btn-primary" @click="publish">发表</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import EmojiInput from "@/components/general/input/EmojiInput.vue";
import {ref} from "vue";

let comment = ref("");

const publish = () => {
  console.log(comment.value)
}

const  changeValue = (text: string) => {
  comment.value = text;
}


</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.comment-input {
  .publish-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-right: 5px;
  }
}
</style>