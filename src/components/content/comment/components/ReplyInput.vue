<template>
  <div class="reply-input-wrapper" style="display: none" ref="reply">
    <textarea
        ref="replyTextarea"
        class="reply-textarea"
        :placeholder="'回复 @' +  nickname + ': '"
        auto-grow
        v-model="commentContent"
    />
    <div class="emoji-container">
      <span
          :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'"
          @click="chooseEmoji = !chooseEmoji"
      >
        <i class="iconfont iconbiaoqing"/>
      </span>
      <div class="publish-box">
        <button class="k-btn k-btn-cancel" @click="cancelReply">取消</button>
        <button class="k-btn k-btn-primary" @click="insertReply">发表</button>
      </div>
    </div>
    <Emoji
        :chooseEmoji="chooseEmoji"
        @addEmoji="addEmoji"
    />
  </div>
</template>

<script setup lang="ts">

import {inject, ref} from "vue";
import Emoji from "@/components/general/emoji/Emoji.vue";
import {ProcessInterface} from "@/d.ts/modules/process";
import useUserStore from "@/store/modules/user";
import EmojiObject from "@/assets/images/emoji/emoji";

// refs
const reply = ref();
const replyTextarea = ref();

const emit = defineEmits(["reloadReply"]);
const $process = inject<ProcessInterface>("$process")!;
const $user = useUserStore();

const index = ref(0);
const chooseEmoji = ref(false);
const nickname = ref("");
const replyUserId = ref(null);
const parentId = ref(null);
const commentContent = ref("");

const cancelReply = () => {
  reply.value.style.display = "none";
}

const insertReply = () => {
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
  console.log(commentContent.value);
}

const addEmoji = (text: number) => {
  commentContent.value += text;
}

const focusTextarea = () => {
  // 在子组件中调用 focusTextarea 方法时，将焦点设置到输入框
  replyTextarea.value.focus();
}

defineExpose({
  index,
  chooseEmoji,
  nickname,
  replyUserId,
  parentId,
  commentContent,
  focusTextarea
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.reply-input-wrapper {
  border: 1px solid #90939950;
  border-radius: 4px;
  padding: 10px;
  margin: 15px 0;

  .reply-textarea {
    font-size: 0.875rem;
    color: #555 !important;
    outline: none;
    padding: 10px 5px;
    min-height: 88px;
    resize: none;
    width: 100%;
    border-radius: 4px;
  }

  .emoji-container {
    margin: 10px 0;
    display: flex;
    align-items: center;

    .publish-box {
      margin-left: auto;

      button {
        margin: 0 5px;
      }
    }
  }
}


</style>