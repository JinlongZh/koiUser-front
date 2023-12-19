<template>
  <article-item
      v-if="data.type === 1"
      :data="props.data.homeListDTO"
      :index="1"
  />
  <talk-item
      v-if="data.type === 2"
      :id="data.id"
      :content="data.homeListDTO.content"
      :imageList="data.homeListDTO.imageList"
      :talkTop="data.homeListDTO.talkTop"
      :viewCount="data.homeListDTO.viewCount"
      :createTime="data.homeListDTO.createTime"
  />
</template>

<script setup lang="ts">
import ArticleItem from "@/components/content/article/ArticleItem.vue";
import TalkItem from "@/components/content/talk/TalkItem.vue";

const props = defineProps(["data"]);

</script>

<style scoped lang="scss">

</style>