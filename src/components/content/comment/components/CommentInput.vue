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
import {inject, ref} from "vue";
import type {ProcessInterface} from "@/d.ts/modules/process";
import useUserStore from "@/store/modules/user";
import EmojiObject from "@/assets/images/emoji/emoji";

const $process = inject<ProcessInterface>("$process")!;
const $user = useUserStore();

let commentContent = ref<string>("");

const publish = () => {
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

const changeValue = (text: string) => {
  commentContent.value = text;
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