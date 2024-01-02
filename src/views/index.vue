<template>
  <div class="index">
    <Header class="header" v-if="headerSwitch"/>
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive :include="keepAliveRoute">
          <component class="component" :is="Component"/>
        </keep-alive>
      </router-view>
    </div>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/index/Header.vue";
import {inject, nextTick, onMounted} from "vue";
import {ProcessInterface} from "@/d.ts/plugins";
import useWindow from "@/store/modules/window";
import Footer from "@/components/index/Footer.vue";
import {siteConfig} from "@/config/program"

const $process = inject<ProcessInterface>("$process")!;
const $window = useWindow();
const headerSwitch = $process.headerStatus.value;
const keepAliveRoute = siteConfig.keepAliveRoute;

onMounted(() => {
  DOMObserve();
})

// DOM监听
const DOMObserve = () => {
  nextTick(() => {
    let dom = document.querySelector("html")!;
    let win: any = window;
    // let MutationObserver = win.MutationObserver || win.webkitMutationObserver || win.MozMutationObserver;
    let mutationObserver = new MutationObserver((mutations: any) => {
      let height = dom.offsetHeight;
      // header形态监听
      $process.headerCheckSwitch($window.height, height);
      // footer形态更新
      $process.footerPositionSwitch($window.height, height);
    })
    mutationObserver.observe(dom, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
      attributeOldValue: false,
      characterDataOldValue: false
    })
  })
}
</script>

<style scoped lang="scss">
.index {
  background: linear-gradient( 90deg, rgba(247, 149, 51, 0.1) 0, rgba(243, 112, 85, 0.1) 15%, rgba(239, 78, 123, 0.1) 30%, rgba(161, 102, 171, 0.1) 44%, rgba(80, 115, 184, 0.1) 58%, rgba(16, 152, 173, 0.1) 72%, rgba(7, 179, 155, 0.1) 86%, rgba(109, 186, 130, 0.1) 100% );
  background-size: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    width: 1200px;
    margin: 70px auto 0;
    display: flex;
    //flex-direction: v-bind(sideCardPosition);
    justify-content: space-between;

  }
}

@media screen and (max-width: 1240px) {
  .content {
    width: 1000px !important;

    .cardGroup {
      width: 290px !important;
    }
  }
}

@media screen and (max-width: 1040px) {
  .content {
    width: 800px !important;

  }
}

@media screen and (max-width: 800px) {
  .content {
    width: 100% !important;
    flex-direction: column-reverse !important;


    .component {
      width: calc(100% - 40px) !important;
      margin: 0 auto !important;
    }
  }
}
</style>