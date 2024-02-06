<template>
  <div class="header" :class="{'active': !transparent}">
    <div class="space" @click="pageJump('/')">{{ websiteStore.websiteAuthor }}</div>
    <div class="right">
      <HeaderItem v-if="mpSwitch"/>
      <svg-icon class="menuBar" icon-class="menu-bar" @click="openSideBar" v-else></svg-icon>
      <div class="dropDown" v-if="userStore.isLoggedIn">
        <div class="avatar" @click="avatarClick"
             :style="{ backgroundImage: 'url(' + userStore.userInfo?.avatar + ')' }"></div>
        <div class="dropDown-content">
          <div class="child" @click="pageJump(publicPath.userCenter)">
            <img :src=resource.userCenter alt="">
            <div class="word">个人中心</div>
          </div>
          <div class="child" @click="logout">
            <img :src=resource.logout alt="">
            <div class="word">退出登录</div>
          </div>
        </div>
      </div>
      <div class="login-button" @click="openLogin" v-else>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-denglu"></use>
        </svg>
        <span> 登录</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ProcessInterface} from "@/d.ts/plugins";
import {inject, ref, watch} from "vue";
import {siteConfig} from "@/config/program";
import resource from "@/config/resource";
import useWindowStore from "@/store/window";
import useUserStore from "@/store/user";
import {publicPath} from "@/router/path";
import useWebsiteStore from "@/store/website";
import HeaderItem from "@/components/index/components/HeaderItem.vue";
import SvgIcon from "@/components/general/icon/SvgIcon.vue";

const router = useRouter();
const $window = useWindowStore();
const $process = inject<ProcessInterface>("$process")!;
const userStore = useUserStore();
const websiteStore = useWebsiteStore();

// true: 显示  false: 显示侧边栏
let mpSwitch = ref<boolean>(true);
let lock = true; // 显示锁
let transparent = ref(true); // 是否透明

const pageJump = (path: string) => {
  router.push(path);
};

const openSideBar = () => {
  console.log("openSideBar");
};

const avatarClick = () => {
  console.log("avatarClick");
}

const openLogin = () => {
  router.push("/login");
}

const logout = () => {
  console.log("退出登录")
}

watch(
    () => $window.width,
    (value) => {
      mpSwitch.value = value > siteConfig.mpThreshold;
    },
    {immediate: true}
);

watch(
    () => $window.scrollTop,
    (value) => {
      if (value == 0) {
        // lock = true;
        // jQuery(".header").css("top", "0px");
        // 设为透明
        transparent.value = true;
      } else {
        transparent.value = false;
      }
    }
);

// 滚轮与滑动监听
// onMounted(() => {
//   useMouseWheel(
//       () => {
//         if (lock) return;
//         jQuery(".header").css("top", "0px");
//         lock = true;
//       },
//       () => {
//         if (!lock || $process.headerCheckLock.value) return;
//         jQuery(".header").css("top", "-60px");
//         lock = false;
//       }
//   );
// });


</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.active {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 1px 3px 0 rgba(0, 34, 77, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  .space, .right {
    color: #333;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  min-width: 370px;
  width: 100%;
  max-width: 2500px;
  margin: 0 auto;
  height: 60px;
  padding: 20px 40px 20px 40px;
  transition: 0.3s ease-out;
  position: fixed;
  z-index: 998;
  top: 0;
  left: 50%;
  color: #fff;
  font-weight: 600;
  transform: translateX(-50%);

  .space {
    width: 140px;
    height: 20px;
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

    .dropDown {
      position: relative;
      cursor: pointer;

      .avatar {
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        border-radius: 50%;
        transform: translateY(-10px);
        box-shadow: 0 0 5px rgba($black, 0.7);
        -webkit-box-shadow: 0 0 5px rgba($black, 0.7);
        -moz-box-shadow: 0 0 5px rgba($black, 0.7);
        cursor: pointer;
      }

      .dropDown-content {
        position: absolute;
        top: calc(100% + 13px); /* 调整菜单的垂直位置 */
        right: -20px; /* 调整菜单右对齐 */
        width: 120px;
        opacity: 0;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 4px 8px 6px rgba(7, 17, 27, .06);
        visibility: hidden;
        transform: translateY(-10px);
        transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
        z-index: 999;

        .child {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          cursor: pointer;
          color: #333;

          &:hover {
            background-color:  #80c8f8;
          }

          img {
            width: 16px;
            height: 16px;
            display: block;
          }

          .word {
            line-height: 20px;
            margin-left: 5px;
          }
        }
      }

      &:hover .dropDown-content {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }

    .login-button {
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