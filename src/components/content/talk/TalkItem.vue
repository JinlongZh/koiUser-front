<template>
  <div class="talkItem card t-shadow">
    <div class="talkContent">
      <talk-md :content="props.content" :commentId="props.id"/>
    </div>
    <div class="imgList" v-if="props.picList.length">
      <div class="talkImg" v-for="item in props.picList" :key="item">
        <Image :imgArray="props.picList" :url="item" size="97px"/>
      </div>
    </div>
    <div class="talkFoot">
      <!-- 发表时间 -->
      <div class="talk-time">
        <span class="talk-top">
            <svg-icon icon-class="zhiding" style="width: 1rem; height: 1rem; "/>置顶
        </span>
        {{ props.createTime }}
      </div>
      <div class="data">
        <div class="views">阅读:{{ props.views }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Image from "@/components/general/image/Image.vue";
import TalkMd from "@/components/content/talk/TalkMd.vue";

const props = defineProps(["id", "content", "picList", "views", "comments", "createTime"]);


</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";

.talkItem {
  width: calc(100% - 5px);
  margin: 2px auto 20px;
  padding: 8px 40px;
  font-size: 14px; // 字体
  background: rgba(255, 255, 255, 0.1);


  .talkContent {
    margin-top: 8px;
    margin-bottom: 10px;
    //white-space: pre-line;
  }

  .imgList {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    padding: 0 10px;
    margin-top: 8px;

    .talkImg {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }

  .talkFoot {
    display: flex;
    justify-content: space-between;
    height: 40px;
    margin-top: 10px;
    padding-top: 5px;
    line-height: 30px;
    font-size: 95%;
    color: #999;

    .talk-time {

      .talk-top {
        color: #ff7242;
        margin-left: 10px;
      }
    }

    .data {
      width: 140px;
      display: flex;
      justify-content: flex-end;

    }
  }
}


</style>
