<template>
  <div class="talkList">
    <div class="talkItem" v-for="item in talkListData" :key="item">
      <talk-item
          :id="item.id"
          :content="item.content"
          :imageList="item.imageList"
          :talkTop="item.talkTop"
          :viewCount="item.viewCount"
          :createTime="item.createTime"
          @click="jumpDetail(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TalkItem from "@/components/content/talk/TalkItem.vue";

const router = useRouter();

const props = defineProps(["talkListData"])

const jumpDetail = (id: number) => {
  window.open(router.resolve(`/talk/detail/${id}`).href, "_blank");
};

</script>

<style scoped lang="scss">

</style>