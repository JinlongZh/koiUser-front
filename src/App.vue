<template>
  <router-view></router-view>

  <!-- 弹出层 -->
  <Tip />
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {inject} from "vue";
import {ProcessInterface} from "@/d.ts/plugins";
import useWindow from "@/store/modules/window";

const router = useRouter();
const $process = inject<ProcessInterface>("$process")!;
const $window = useWindow();

// 空间初始化
router.isReady().then(async () => {
  listenWindow.initAll();
});

// 为组件提供浏览器数据
let listenWindow = {
  initSize: () => $window.initSize(),
  initDistance: () => $window.initDistance(),
  initAll() {
    listenWindow.initSize();
    listenWindow.initDistance();
  }
}
window.addEventListener("resize", listenWindow.initSize);
window.addEventListener("scroll", listenWindow.initDistance);

</script>

<style scoped lang="scss">

</style>
