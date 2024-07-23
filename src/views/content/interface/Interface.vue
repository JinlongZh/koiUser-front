<template>
  <div class="page-interface">
    <page-cover
        title="🏖️好玩的接口!"
        subtitle="生活不止有代码,别忘了还有诗和远方"
        bg="/src/assets/images/9af3840152294a18836ac9786c3930ec.jpg"
    ></page-cover>

    <main>
      <div class="interface-list">
        <Wait :show="show" height="400px">
          <div class="interface-item" v-for="item in interfaceInfoList" :key="item.id" @click="goto(item.id)">
            <div class="interface-title font-bold text5">
              {{ item.name }}
            </div>
            <div class="interface-description text3">
              {{ item.description }}
            </div>
            <div class="interface-info text3">
              更新时间: {{ $filters.date(item.updateTime) }}
            </div>
          </div>
        </Wait>

        <Pagination
            :total="total"
            :page-size="pageSize"
            :current="page"
            :hide-on-single-page="true"
            :show-total="true"
            @pageChange="pageChange"
        />
      </div>
    </main>
  </div>

</template>

<script setup lang="ts">

import PageCover from "@/components/general/page-cover/PageCover.vue";
import {useRouter} from "vue-router";
import {onBeforeMount, ref, watch} from "vue";
import {InterfaceInfo} from "@/d.ts/api/interfacer/interfaceInfo";
import {getInterfaceInfoPage} from "@/api/interfacer/interfaceInfo";
import {Wait} from "@/components/popup";
import Pagination from "@/components/general/page/Pagination.vue";

const router = useRouter();

let interfaceInfoList = ref<Array<InterfaceInfo>>([]);

let page = ref<number>(1);
let pageSize = ref(10);
let total = ref<number>(0);
let name = ref<string>("");
let show = ref(true);


const pageChange = (target: number) => {
  router.push({
    path: "/interface/list",
    query: {
      page: target.toString(),
    }
  });
  // 展示加载动画
  show.value = true;
}

const goto = (id: number) => {
  router.push({
    path: `/interface/detail/${id}`
  });
}

watch(
    () => router.currentRoute.value.query,
    () => {
      if (router.currentRoute.value.path != "/interface/list") return;
      page.value = Number(router.currentRoute.value.query.page) || 1;
      getInterfaceList();
    }
)

onBeforeMount(() => {
  initData();
})

const initData = () => {
  // 刷新时停留在之前的分页上
  page.value = Number(router.currentRoute.value.query.page) || 1;
  getInterfaceList(); // 确保在初始化时加载分页数据
}

const getInterfaceList = async () => {
  await getInterfaceInfoPage(page.value, pageSize.value, name.value).then(result => {
    total.value = result.data.total;
    interfaceInfoList.value = result.data.list;
    // 取消加载动画
    show.value = false;
  });
}

</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.page-interface {

  main {
    max-width: 940px;
    min-height: 800px;
    display: flex;
    align-items: flex-start;
    position: relative;
    z-index: 9;
    margin: -80px auto auto;
  }

  .interface-list {
    width: 100%;
    background: #fff;
    padding: 30px 10px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;


    .interface-item {
      width: 40%;
      height: 120px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
      border-radius: 8px;
      overflow: hidden;
      padding: 16px 24px;
      margin: 10px 20px;
      border: 2px solid #fbfbfb;
      background: #fbfbfb;
      position: relative;
      cursor: pointer;

      .interface-description {
        margin-top: 10px;
      }

      .interface-info {
        color: #8c8c8c;
        position: absolute;
        right: 1rem;
        bottom: 1rem;
      }
    }
  }
}

</style>