<template>
  <div class="interface">
    <SideMenu :menus="menus" name="开放接口"></SideMenu>
  </div>
</template>

<script setup lang="ts">

import {pathConfig} from "@/config/program";
import resource from "@/config/resource";
import SideMenu from "@/components/general/menu/SideMenu.vue";

const menus = [
  {
    path: pathConfig.interfaceList,
    icon: resource.interfaceList,
    word: "接口列表"
  },
]

</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";
@import "@/assets/scss/div.scss";

.interface {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;

}
</style>