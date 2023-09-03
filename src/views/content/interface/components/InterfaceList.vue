<template>
  <div class="interface-list">
    <div class="header">
      <span class="title">接口列表</span>
    </div>
    <div class="content">
      <div class="list">
        <div class="item" v-for="item in interfaceInfoList" :key="item.id">
          <interface-card
              :id="item.id"
              :name="item.name"
          />
        </div>
      </div>
    </div>

    <Pagination
        :total="total"
        :page-size="10"
        :current="page"
        :hide-on-single-page="true"
        :show-total="true"
        @pageChange="pageChange"
    />
  </div>

</template>

<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {getInterfaceInfoPage} from "@/api/interfacer/interfaceInfo";
import InterfaceCard from "@/components/content/interface/card/InterfaceCard.vue";
import Pagination from "@/components/general/page/Pagination.vue";
import {useRouter} from "vue-router";
import {InterfaceInfo} from "@/d.ts/api/interfacer/interfaceInfo";

const router = useRouter();

let interfaceInfoList = ref<Partial<InterfaceInfo>>([]);

let page = ref<number>(1);
let pageSize = ref(10);
let total = ref<number>(0);
let name = ref<string>("");


const pageChange = (target: number) => {
  router.push({
    path: "/interfaceList",
    query: {
      page: target.toString(),
    }
  });
}

watch(
    () => router.currentRoute.value.query,
    () => {
      if(router.currentRoute.value.path != "/interfaceList") return;
      page.value = Number(router.currentRoute.value.query.page) || 1;
      getInterfaceList();
    }
)

onMounted(() => {
  initData();
})

const initData = () => {
  // 刷新时停留在之前的分页上
  page.value = Number(<string>router.currentRoute.value.query.page) || 1;
  getInterfaceList();
}

const getInterfaceList = async () => {
  await getInterfaceInfoPage(page.value, pageSize.value, name.value).then(result => {
    total.value = result.data.total;
    interfaceInfoList.value = result.data.list;
  });
}

</script>

<style scoped lang="scss">
.interface-list {
  .header {
    padding: 0 30px;
    line-height: 50px;
    border-bottom: 1px solid #ebebeb;
  }

  .content {
    padding: 30px 38px;

    .list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .item {
        margin-bottom: 28px;
      }
    }
  }
}
</style>