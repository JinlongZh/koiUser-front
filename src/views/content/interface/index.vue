<template>
  <div class="page-interface">
    <page-cover
        title="🏖️茶余饭后,聊聊天!"
        subtitle="生活不止有代码,别忘了还有诗和远方"
        bg="http://cdn.koicode.cn/system-image/9af3840152294a18836ac9786c3930ec.jpg"
    ></page-cover>

    <main>
      <div class="interface">
        <SideMenu :menus="menus" name="开放接口"></SideMenu>
      </div>
    </main>
  </div>

</template>

<script setup lang="ts">

import {pathConfig} from "@/config/program";
import resource from "@/config/resource";
import SideMenu from "@/components/general/menu/SideMenu.vue";
import PageCover from "@/components/general/page-cover/PageCover.vue";

const menus = [
  {
    path: pathConfig.interfaceList,
    icon: resource.interfaceList,
    word: "接口列表"
  },
]

</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.page-interface {

  main {
    max-width: 1200px;
    display: flex;
    align-items: flex-start;
    position: relative;
    z-index: 9;
    margin: -80px auto auto;
  }

  .interface {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}

</style>