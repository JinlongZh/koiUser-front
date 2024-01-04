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
  <Load />
  <Wait />
  <Tools />
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {inject, ref} from "vue";
import {ProcessInterface} from "@/d.ts/plugins";
import useWindow from "@/store/modules/window";
import useUserStore from "@/store/modules/user";
import {getUserInfo} from "@/api/system/user";
import {getAccessToken, getRefreshToken} from "@/utils/auth";
import { Tip, Wait, Load } from "@/components/popup";
import Tools from "@/components/Tools.vue";

const router = useRouter();
const $process = inject<ProcessInterface>("$process")!;
const $window = useWindow();
const $user = useUserStore();

let isShow = ref(false);

// 空间初始化
router.isReady().then(async () => {
  Promise.all([user()]).then(async (res) => {
    const [userInfo] = res;
    $user.initUserInfo(userInfo.data);
  }).catch(() => {

  }).finally(() => {
    closeLoad(); // 关闭加载层
    listenWindow.initAll();
  })
});

// 用户信息初始化
const user = () => {
  if (getAccessToken() && getRefreshToken()) {
    return getUserInfo();
  } else {
    return "";
  }
}

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

// 关闭遮罩层
const closeLoad = () => {
  isShow.value = true;
  $process.loadHide();
}

</script>

<style scoped lang="scss">

</style>
