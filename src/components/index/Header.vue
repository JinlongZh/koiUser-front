<template>
  <div class="header">
    <div class="space" @click="pageJump('/')">用户中心</div>
    <div class="right">
      <HeaderItem v-if="mpSwitch"/>
      <div class="menuBar" :style="{backgroundImage: 'url(' + menuBar + ')' }" @click="openSideBar" v-else></div>
      <div class="avatar" @click="avatarClick" :style="{ backgroundImage: 'url(' + avatar + ')' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ProcessInterface} from "@/d.ts/plugins";
import jQuery from 'jquery';
import {inject, onMounted, ref, watch} from "vue";
import {siteConfig} from "@/config/program";
import useMouseWheel from "@/hooks/useMouseWheel";
import resource from "@/config/resource";
import useWindow from "@/store/modules/window";

const router = useRouter();
const $window = useWindow();
const $process = inject<ProcessInterface>("$process")!;
const menuBar = resource.menuBar;

// true: 显示  false: 显示侧边栏
let mpSwitch = ref<boolean>(true);
let lock = true; // 显示锁

const pageJump = (path: string) => {
  router.push(path);
};

const openSideBar = () => {
  console.log("openSideBar");
};

const avatarClick = () => {
  console.log("avatarClick");
}

watch(
    () => $window.width,
    (value) => {
      mpSwitch.value = value > siteConfig.mpThreshold;
      console.log(mpSwitch.value)
    },
    {immediate: true}
);

watch(
    () => $window.scrollTop,
    (value) => {
      if (value == 0) {
        lock = true;
        jQuery(".header").css("top", "0px");
      }
    }
);

// 滚轮与滑动监听
onMounted(() => {
  useMouseWheel(
      () => {
        if (lock) return;
        jQuery(".header").css("top", "0px");
        lock = true;
      },
      () => {
        if (!lock || $process.headerCheckLock.value) return;
        jQuery(".header").css("top", "-60px");
        lock = false;
      }
  );
});


</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.header {
  display: flex;
  justify-content: space-between;
  min-width: 370px;
  width: 100%;
  max-width: 2500px;
  margin: 0 auto;
  height: 60px;
  padding: 20px 40px 20px 40px;
  background: rgba($white, 0.7);
  color: $normal;
  transition: top 0.5s;
  position: fixed;
  z-index: 998;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  .space {
    width: 140px;
    height: 20px;
    color: $title;
    line-height: 20px;
    font-size: 20px;
    cursor: pointer;
  }

  .right {
    display: flex;
    justify-content: space-between;

    .menuBar {
      width: 30px;
      height: 30px;
      background-size: 100% 100%;
      transform: translate(-10px, -5px);
      cursor: pointer;
    }

    .avatar {
      width: 40px;
      height: 40px;
      background-size: 100% 100%;
      border-radius: 50%;
      transform: translateY(-10px);
      box-shadow: 0 0 5px rgba($color: $black, $alpha: 0.7);
      -webkit-box-shadow: 0 0 5px rgba($color: $black, $alpha: 0.7);
      -moz-box-shadow: 0 0 5px rgba($color: $black, $alpha: 0.7);
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 800px) {
  .header {
    padding: 20px !important;
  }
}
</style>