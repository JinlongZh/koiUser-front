<template>
  <div class="page-talk-detail">
    <page-cover
        title="🏖️茶余饭后,聊聊天!"
        subtitle="生活不止有代码,别忘了还有诗和远方"
        bg="/src/assets/images/9af3840152294a18836ac9786c3930ec.jpg"
    ></page-cover>

    <main>
      <div class="talk-details">
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
    </main>
  </div>

</template>

<script setup lang="ts">


import {onMounted, ref} from "vue";
import api from "@/api";
import {useRouter} from "vue-router";
import type {TalkResp} from "@/d.ts/api/blog/talk";
import TalkItem from "@/components/content/talk/TalkItem.vue";
import {Wait} from "@/components/popup";
import Comment from "@/components/content/comment/Comment.vue";
import {CommentApiType} from "@/config/constant";
import PageCover from "@/components/general/page-cover/PageCover.vue";

const router = useRouter();

const talkId = ref(router.currentRoute.value.params.id);
const talkData = ref<TalkResp>({});
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

.page-talk-detail {
  main {
    max-width: 1200px;
    display: flex;
    align-items: flex-start;
    position: relative;
    z-index: 9;
    margin: -80px auto auto;
  }

  .talk-details {
    width: 75%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 2.5rem 3rem;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
  }
}


</style>