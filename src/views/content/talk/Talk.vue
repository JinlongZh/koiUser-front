<template>
  <div class="talk-container">
    <div class="talk-content">
      <Wait :show="show" height="400px">
        <TalkList :talkListData="talkListData"/>
      </Wait>
      <Pagination
          :total="total"
          :page-size="pageSize"
          :current="pageNo"
          :hide-on-single-page="false"
          :show-total="true"
          @pageChange="pageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import {onBeforeMount, ref, watch} from "vue";
import Pagination from "@/components/general/page/Pagination.vue";
import {useRouter} from "vue-router";
import TalkList from "@/components/content/talk/TalkList.vue";
import api from "@/api";

const router = useRouter();

let talkListData = ref([]);
let show = ref(true);
let pageNo = ref(1);
let pageSize = ref(8);
let total = ref(0);

const pageTalk = async () => {
  await api.pageTalk({
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  }).then(({data}) => {
    total.value = data.total;
    talkListData.value = data.list;
    show.value = false;
  });
}

const pageChange = (target: number) => {
  router.push({
    path: "/talk",
    query: {
      page: target
    }
  });
  pageNo.value = target;
  // 展示加载动画
  show.value = true;
}

onBeforeMount(() => {
  pageNo.value = router.currentRoute.value.query.page ? Number(router.currentRoute.value.query.page) : 1;
  pageTalk();
})

watch(
    () => pageNo.value,
    () => {
      pageTalk();
    }
)

</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.talk-container {
  width: 100%;
  display: flex;
  justify-content: center;

  .talk-content {
    width: 75%;
    padding: 0 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

</style>