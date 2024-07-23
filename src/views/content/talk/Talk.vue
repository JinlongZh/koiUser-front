<template>
  <div class="page-talk">
    <page-cover
        title="🏖️茶余饭后,聊聊天!"
        subtitle="生活不止有代码,别忘了还有诗和远方"
        bg="src/assets/images/9af3840152294a18836ac9786c3930ec.jpg"
    ></page-cover>

    <main>
      <div class="talk-container">
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
    </main>
  </div>
</template>

<script setup lang="ts">

import {onBeforeMount, ref, watch} from "vue";
import Pagination from "@/components/general/page/Pagination.vue";
import {useRouter} from "vue-router";
import TalkList from "@/components/content/talk/TalkList.vue";
import api from "@/api";
import PageCover from "@/components/general/page-cover/PageCover.vue";

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

.page-talk {

  main {
    max-width: 940px;
    min-height: 800px;
    margin: -80px auto auto;
    position: relative;
    z-index: 9;
  }

  .talk-container {
    padding: 30px 2.5rem 3rem;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
  }
}

</style>