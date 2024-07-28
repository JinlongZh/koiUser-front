<template>
  <div class="comment-input-wrapper">
    <textarea
        class="comment-textarea"
        v-model="commentContent"
        placeholder="留下点什么吧..."
    />
    <div class="emoji-container">
      <span
          :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'"
          @click="chooseEmoji = !chooseEmoji"
      >
        <i class="iconfont iconbiaoqing"/>
      </span>
      <div class="publish-box">
        <button class="k-btn k-btn-primary" @click="insertComment">发表</button>
      </div>
    </div>
    <Emoji
        :chooseEmoji="chooseEmoji"
        @addEmoji="addEmoji"
    />
  </div>
</template>

<script setup lang="ts">

import {defineEmits, inject, ref} from "vue";
import type {ProcessInterface} from "@/d.ts/modules/process";
import useUserStore from "@/store/user";
import EmojiObject from "@/assets/images/emoji/emoji";
import Emoji from "@/components/general/emoji/Emoji.vue";
import {useRoute} from "vue-router";
import {CommentApiType} from "@/config/constant";
import api from "@/api";

const $process = inject<ProcessInterface>("$process")!;
const $user = useUserStore();
const route = useRoute();
const emit = defineEmits(["reloadComment"]);

const commentContent = ref<string>("");
const chooseEmoji = ref(false);
const commentType = inject<CommentApiType>("commentType");
const topicId = inject<number>("topicId");


const insertComment = () => {
  // 判断登录
  if (!$user.isLoggedIn) {
    $process.tipShow.warn("请先登录");
    return false;
  }
  // 判空
  if (commentContent.value.trim() === "") {
    $process.tipShow.warn("评论不能为空");
    return false;
  }
  // 合并emoji
  const faceObject = {}
  Object.assign(faceObject, EmojiObject);
  //解析表情
  const reg = /\[.+?\]/g;
  commentContent.value = commentContent.value.replace(reg, (str) => {
    // 查找最后一个.的索引
    const lastSpot = faceObject[str].lastIndexOf('.');
    // 获取后缀名(.gif)
    const suffix = faceObject[str].slice(lastSpot, faceObject[str].length);

    if (suffix === '.gif') {
      return `<img src="${faceObject[str]}" width="60" height="60" style="padding: 0 1px"/>`;
    } else {
      return `<img src="${faceObject[str]}" width="22" height="22" style="padding: 0 1px"/>`;
    }
  });

  let req = {
    type: commentType,
    topicId: topicId,
    commentContent: commentContent.value
  }
  commentContent.value = "";
  api.insertComment(req).then(({ data }) => {
    $process.tipShow.success("评论成功");
    chooseEmoji.value = false;
    emit("reloadComment");
  })
}

const addEmoji = (key: number) => {
  commentContent.value += key;
}


</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.comment-input-wrapper {
  border: 1px solid #90939950;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  margin: 15px 0;

  .emoji-container {
    margin: 10px 0;
    display: flex;
    align-items: center;

    .publish-box {
      margin-left: auto;
    }
  }
}
</style>