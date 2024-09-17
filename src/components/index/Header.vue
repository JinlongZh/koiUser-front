<template>
  <div class="header" :class="{'active': !transparent}">
    <div class="space" @click="pageJump('/')">{{ websiteStore.websiteAuthor }}</div>
    <div class="right">
      <!--导航列表-->
      <div v-if="mpSwitch">
        <ul class="scroll-menu">
          <li @click="$router.push({path: '/'})">
            <div class="my-menu">
              🏡 <span>首页</span>
            </div>
          </li>

          <!-- 家 -->
          <li @click="pageJump(publicPath.article)">
            <div class="my-menu">
              🔖️‍ <span>文章</span>
            </div>
          </li>

          <li @click="pageJump(publicPath.talk)">
            <div class="my-menu">
              ☘️‍ <span>说说</span>
            </div>
          </li>

          <li @click="pageJump(publicPath.interface)">
            <div class="my-menu">
              🧰 <span>百宝箱</span>
            </div>
          </li>

          <li @click="$router.push({path: '/friend'})">
            <div class="my-menu">
              ✈️<span>友链</span>
            </div>
          </li>

          <li @click="$router.push({path: '/message'})">
            <div class="my-menu">
              📪 <span>留言</span>
            </div>
          </li>

          <!-- 聊天室 -->
          <li @click="pageJump(publicPath.im)">
            <div class="my-menu">
              💬 <span>聊天室</span>
            </div>
          </li>

          <!-- 个人中心 -->
          <li>
            <el-dropdown placement="bottom" v-if="userStore.isLoggedIn">
              <el-avatar class="user-avatar" :size="36"
                         :src="userStore.userInfo.avatar">
              </el-avatar>

              <template #dropdown>
                <el-dropdown-menu style="width: 200px; color: red">
                  <!--<el-dropdown-item @click.native="pageJump('/user')">-->
                  <!--  <svg-icon icon-class="qq"/> <span>个人中心</span>-->
                  <!--</el-dropdown-item>-->
                  <el-dropdown-item @click.native="handleLogout()">
                    <svg-icon icon-class="exit" style="width: 18px; height: 18px; margin-right: 10px"/> <span>退出</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <div v-else @click="openLogin">
              denglu
            </div>
          </li>
        </ul>
      </div>
      <!--图标-->
      <svg-icon class="menuBar" icon-class="menu-bar" @click="openSideBar" v-else></svg-icon>


      <!--<div class="dropDown" v-if="userStore.isLoggedIn">-->
      <!--  <div class="avatar" @click="avatarClick"-->
      <!--       :style="{ backgroundImage: 'url(' + userStore.userInfo?.avatar + ')' }"></div>-->
      <!--  <div class="dropDown-content">-->
      <!--    <div class="child" @click="pageJump(publicPath.userCenter)">-->
      <!--      <img :src=resource.userCenter alt="">-->
      <!--      <div class="word">个人中心</div>-->
      <!--    </div>-->
      <!--    <div class="child" @click="logout">-->
      <!--      <img :src=resource.logout alt="">-->
      <!--      <div class="word">退出登录</div>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</div>-->
      <!--<div class="login-button" @click="openLogin" v-else>-->
      <!--  <svg class="icon" aria-hidden="true">-->
      <!--    <use xlink:href="#icon-denglu"></use>-->
      <!--  </svg>-->
      <!--  <span> 登录</span>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ProcessInterface} from "@/d.ts/plugins";
import {inject, ref, watch} from "vue";
import {siteConfig} from "@/config/program";
import useWindowStore from "@/store/window";
import useUserStore from "@/store/user";
import {publicPath} from "@/router/path";
import useWebsiteStore from "@/store/website";
import SvgIcon from "@/components/general/icon/SvgIcon.vue";
import {logout} from "@/api/system/login";

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

const handleLogout = () => {
  logout();
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
  align-items: center;
  min-width: 370px;
  width: 100%;
  max-width: 2500px;
  margin: 0 auto;
  height: 60px;
  transition: 0.3s ease-out;
  position: fixed;
  z-index: 998;
  top: 0;
  left: 50%;
  font-weight: 600;
  transform: translateX(-50%);
  user-select: none;

  .space {
    width: 140px;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    cursor: pointer;
    margin-left: 20px;
  }

  .right {
    display: flex;
    justify-content: space-between;

    .scroll-menu {
      height: 60px;
      margin: 0 25px 0 0;
      display: flex;
      justify-content: flex-end;
      padding: 0;

      li {
        height: 100%;
        list-style: none;
        margin: 0 8px;
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:hover {
          .my-menu {
            span {
              color: red;
            }

            &::after {
              max-width: 100%;
            }
          }
        }

        .my-menu {
          &::after {
            content: "";
            display: block;
            position: absolute;
            bottom: 10px;
            height: 6px;
            background-color: red;
            border-radius: 2px;
            width: 100%;
            max-width: 0;
            transition: max-width 0.25s ease-in-out;
          }
        }

        :deep(.el-dropdown) {

        }

      }
    }


  }
}

@media screen and (max-width: 800px) {
  .header {
    padding: 20px !important;
  }
}
</style>