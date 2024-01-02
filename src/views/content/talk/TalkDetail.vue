<template>
  <div class="talk-details card t-shadow">
    <wait :show="show" height="400px">
      <talk-item class="item"
          :id="talkData.id"
          :talkTop="talkData.talkTop"
          :content="talkData.content"
          :imageList="talkData.imageList"
          :viewCount="talkData.viewCount"
          :createTime="talkData.createTime"
      />
    </wait>
    <comment
        :topicId="talkId"
        :commentType="CommentApiType.talk"
    />
  </div>
</template>

<script setup lang="ts">


import {onMounted, ref} from "vue";
import api from "@/api";
import {useRouter} from "vue-router";
import type {TalkDetailInterface} from "@/d.ts/api/blog/talk";
import TalkItem from "@/components/content/talk/TalkItem.vue";
import {Wait} from "@/components/popup";
import Comment from "@/components/content/comment/Comment.vue";
import {CommentApiType} from "@/config/constant";

const router = useRouter();

const talkId = ref(router.currentRoute.value.params.id);
const talkData = ref<TalkDetailInterface>({});
const show = ref(true);
const getTalkDetail = () => {
  api.getTalkDetail(talkId.value).then(({data}) => {
    talkData.value = data;
    show.value = false;
  })
}

onMounted(() => {
  getTalkDetail();
})

</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.talk-details {
  width: 75%;
  padding: 0 2.5rem 3rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .item {
    margin-top: 16px;
  }
}

</style>