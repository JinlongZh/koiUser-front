<template>
  <div class="index">
    <Header class="header" v-if="headerSwitch"/>
    <transition name="fade-transform" mode="out-in">
      <div :key="key">
        <router-view :key="key" class="content" />
        <Footer/>
      </div>
    </transition>

    <!--<div class="content">-->
    <!--  <router-view v-slot="{ Component }">-->
    <!--    <keep-alive :include="keepAliveRoute">-->
    <!--      <component class="component" :is="Component"/>-->
    <!--    </keep-alive>-->
    <!--  </router-view>-->
    <!--</div>-->
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/index/Header.vue";
import {computed, inject, nextTick, onMounted, ref, watch} from "vue";
import {ProcessInterface} from "@/d.ts/plugins";
import useWindowStore from "@/store/window";
import Footer from "@/components/index/Footer.vue";
import {siteConfig} from "@/config/program"
import {useRoute} from "vue-router";

const $process = inject<ProcessInterface>("$process")!;
const $window = useWindowStore();
const headerSwitch = $process.headerStatus.value;
const route = useRoute();
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

const key = computed(() => {
  return route.fullPath;
})

watch(() => route.fullPath, () => {
  window.scrollTo({
    behavior: "smooth",
    top: 0
  });
})

</script>

<style scoped lang="scss">
.index {
  //background: linear-gradient( 90deg, rgba(247, 149, 51, 0.1) 0, rgba(243, 112, 85, 0.1) 15%, rgba(239, 78, 123, 0.1) 30%, rgba(161, 102, 171, 0.1) 44%, rgba(80, 115, 184, 0.1) 58%, rgba(16, 152, 173, 0.1) 72%, rgba(7, 179, 155, 0.1) 86%, rgba(109, 186, 130, 0.1) 100% );
  //background-size: 100%;
  //background-image: linear-gradient(
  //        90deg,
  //        rgba(60, 10, 30, 0.05) 3%,
  //        transparent 0
  //),
  //linear-gradient(1turn, rgba(60, 10, 30, 0.05) 3%, transparent 0);
  background-size: 20px 20px;
  background-position: 50%;
  display: flex;
  flex-direction: column;

  .content {
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: rgba(1, 1, 1, 0);
    }

    ::-webkit-scrollbar-thumb {
      background-color: #aaa;
      border-radius: 4px;
    }
    //width: 1200px;
    //margin: 70px auto 0;
    //display: flex;
    //justify-content: space-between;

  }
}

</style>