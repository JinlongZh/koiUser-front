<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <component :is="Component"/>
      </Suspense>
    </template>
  </router-view>

  <!-- 弹出层 -->
  <Tip/>
  <Load/>
  <Wait/>
  <Tools/>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {inject, onMounted, ref} from "vue";
import {ProcessInterface} from "@/d.ts/plugins";
import useWindowStore from "@/store/window";
import useUserStore from "@/store/user";
import {getUserInfo} from "@/api/system/user";
import {getAccessToken, getRefreshToken} from "@/utils/auth";
import {Tip, Wait, Load} from "@/components/popup";
import Tools from "@/components/Tools.vue";
import {getWebsiteConfig, report} from "@/api/system/websiteConfig";
import useWebsiteStore from "@/store/website";

const router = useRouter();
const $process = inject<ProcessInterface>("$process")!;
const windowStore = useWindowStore();
const websiteStore = useWebsiteStore();
const userStore = useUserStore();

let isShow = ref(false);

onMounted(() => {
  user();
  websiteConfig();
  report();

  closeLoad(); // 关闭加载层
  listenWindow.initAll();
})

// 用户信息初始化
const user = () => {
  if (getAccessToken() && getRefreshToken()) {
    getUserInfo().then(({data}) => {
      userStore.initUserInfo(data);
    });
  }
}

// 获取网站配置
const websiteConfig = () => {
  getWebsiteConfig().then(({data}) => {
    websiteStore.$state = {...data};
  });
}

// 为组件提供浏览器数据
let listenWindow = {
  initSize: () => windowStore.initSize(),
  initDistance: () => windowStore.initDistance(),
  initAll() {
    listenWindow.initSize();
    listenWindow.initDistance();
  }
}
window.addEventListener("resize", listenWindow.initSize);
window.addEventListener("scroll", listenWindow.initDistance);

// 关闭遮罩层
const closeLoad = () => {
  isShow.value = true;
  $process.loadHide();
}

</script>

<style scoped lang="scss">

</style>
