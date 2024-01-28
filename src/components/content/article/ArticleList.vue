<template>
  <div class="articleList">
    <div class="articleItem" v-for="(item, index) in articleListData" :key="item">
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
  router.push({
    path: `/article/detail/${id}`
  })
};
</script>

<style lang="scss" scoped>

</style>
