<template>
  <Header class="header" v-if="headerSwitch"/>
  <div class="content">
    content
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/index/Header.vue";
import {inject, onMounted} from "vue";
import {WindowInterface, ProcessInterface} from "@/d.ts/plugins";

const $process = inject<ProcessInterface>("$process")!;
const $window = inject<WindowInterface>("$window");
const headerSwitch = $process.headerStatus.value;

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
    // $process.footerPositionSwitch($window.height.value, height);
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

</style>