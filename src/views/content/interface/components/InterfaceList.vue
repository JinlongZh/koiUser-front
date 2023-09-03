<template>
  <div class="interface-list">
    <div class="header">
      <span class="title">接口列表</span>
    </div>
    <div class="content">
      <div class="list">
        <div class="item" v-for="id in 8">
          <interface-card/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {onMounted} from "vue";
import {getInterfaceInfoPage} from "@/api/interfacer/interfaceInfo";
import InterfaceCard from "@/components/general/card/InterfaceCard.vue";

onMounted(() => {
  getInterfaceInfoPage(1, 10, "").then(result => {
    console.log(result);
  });
})

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