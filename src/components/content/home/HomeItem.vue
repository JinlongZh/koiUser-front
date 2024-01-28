<template>
  <article-item
      v-if="data.type === 1"
      :data="props.data.homeListDTO"
      :index="1"
      @click="jumpArticle(data.homeListDTO.id)"
  />
  <talk-item
      v-if="data.type === 2"
      :id="data.homeListDTO.id"
      :content="data.homeListDTO.content"
      :imageList="data.homeListDTO.imageList"
      :talkTop="data.homeListDTO.talkTop"
      :viewCount="data.homeListDTO.viewCount"
      :createTime="data.homeListDTO.createTime"
      @click="jumpTalk(data.homeListDTO.id)"
  />
</template>

<script setup lang="ts">
import ArticleItem from "@/components/content/article/ArticleItem.vue";
import TalkItem from "@/components/content/talk/TalkItem.vue";
import {useRouter} from "vue-router";

const props = defineProps(["data"]);
const router = useRouter();

const jumpArticle = (id: number) => {
  router.push({
    path: `/article/detail/${id}`
  });
}

const jumpTalk = (id: number) => {
  router.push({
    path: `/talk/detail/${id}`
  });
}

</script>

<style scoped lang="scss">

</style>