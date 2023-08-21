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
import {inject, onMounted} from "vue";
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
function DOMObserve() {
  let dom = document.querySelector("html")!;
  let win: any = window;
  let MutationObserver = win.MutationObserver || win.webkitMutationObserver || win.MozMutationObserver;
  let mutationObserver = new MutationObserver((mutations: any) => {
    let height = document.querySelector("html")!.offsetHeight;
    // header形态监听
    $process.headerCheckSwitch($window.height.value, height);
    // footer形态更新
    $process.footerPositionSwitch($window.height.value, height);
  })
  mutationObserver.observe(dom, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: false,
    attributeOldValue: false,
    characterDataOldValue: false
  })
}
</script>

<style scoped lang="scss">
.index {
  .content {
    width: 1200px;
    margin: 70px auto 0;
    display: flex;
    //flex-direction: v-bind(sideCardPosition);
    justify-content: space-between;

    .cardGroup {
      width: 300px;
    }

    .component {
      flex: 1;
      min-width: 335px;
      margin: 0 20px;
      overflow: hidden;
    }
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

    .cardGroup {
      width: 280px !important;
    }
  }
}

@media screen and (max-width: 800px) {
  .content {
    width: 100% !important;
    flex-direction: column-reverse !important;

    .cardGroup {
      width: 100% !important;
      min-width: 350px;
      margin-top: 20px;
    }

    .component {
      width: calc(100% - 40px) !important;
      margin: 0 auto !important;
    }
  }
}
</style>