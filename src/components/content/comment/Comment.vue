<template>
  <div class="comment-container">
    <div class="comment-title">
      <svg-icon icon-class="comment" class="icon"/>
      <span>评论</span>
    </div>
    <CommentInput />
  </div>
</template>

<script setup lang="ts">

import SvgIcon from "@/components/general/icon/SvgIcon.vue";
import CommentInput from "@/components/content/comment/components/CommentInput.vue";
</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.comment-container {
  width: 75%;
  display: flex;
  flex-direction: column;

  .comment-title {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 40px;
    margin-bottom: 10px;

    .icon {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 8px;
    }
  }
}

</style>