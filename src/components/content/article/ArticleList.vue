<template>
  <div class="animeList">
    <div class="animeItem" v-for="(item, index) in articleListData" :key="item">
      <article-item :data="item" :index="index" @click="jumpDetail(item.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRouter } from "vue-router";
import ArticleItem from "@/components/content/article/ArticleItem.vue";

const router = useRouter();

const props = defineProps(["articleListData"])

const jumpDetail = (id: number) => {
  window.open(router.resolve(`/article/details/${id}`).href, "_blank");
};
</script>

<style lang="scss" scoped>

</style>
