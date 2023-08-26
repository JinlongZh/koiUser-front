<template>
  <div class="side-menu">
    <!--左侧菜单-->
    <div class="container menu">
      <div class="menu_header">个人中心</div>

      <ul class="menu_list">
        <li v-for="(item, index) in menus" :key="index" @click="selMenu(item)">
          <a :class="'router_link menu_item '+ (activeIndex === item.path?'nuxt-link-active':'')">
            <i :class="item.icon" style="font-size: 18px;margin-right: 10px;"></i>
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>

    </div>

    <!--右侧内容-->
    <div class="container content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const $router = useRouter();

const activeIndex = ref<string>("/personal/user_info");
const menus = [
  {name: '个人简介', path: '/personal/user_info', icon: 'el-icon-document'},
  {name: '我的合集', path: '/personal/myCollect', icon: 'el-icon-document'},
];

// onMounted(() => {
//   setInterval(() => {
//     activeIndex.value = $router.currentRoute.value.path;
//   }, 300);
// });

const selMenu = (item: { path: string }) => {
  activeIndex.value = item.path;
  $router.push({path: item.path});
};

</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";
@import "@/assets/scss/userCerter.scss";

.side-menu {
  display: flex;
  justify-content: space-between;

  .menu {
    width: 280px;

    .menu_header {
      width: 100%;
      padding: 0 30px;
      line-height: 50px;
      border-bottom: 1px solid #ebebeb;
      font-size: 16px;
    }

    .menu_list {
      padding: 0 30px 10px;

      ol, ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      ul, li {
        list-style: none;
      }

      .menu_item {
        padding: 0 20px;
        line-height: 50px;
        font-size: 14px;
        color: #666;
        display: flex;
        align-items: center;
        cursor: pointer;

        &.nuxt-link-active {
          color: #00c3ff;
        }
      }

      .icon {
        width: 18px;
        font-size: 18px;
        vertical-align: top;
        display: inline-block;
        color: #d9d9d9;
        margin-right: 15px;
      }
    }
  }

  /*右侧内容*/
  .content {
    width: 700px;
  }
}


//.mhy-side-menu {
//  width: 280px;
//  float: left;
//}
//.mhy-container {
//  background-color: #fff;
//  border-radius: 4px;
//}
//.mhy-side-menu__header {
//  width: 100%;
//  padding: 0 30px;
//  line-height: 50px;
//  border-bottom: 1px solid #ebebeb;
//  font-size: 16px;
//}
//.mhy-side-menu__list {
//  padding: 0 30px 10px;
//}
//ol, ul {
//  margin: 0;
//  padding: 0;
//  list-style: none;
//}
//ul, li {
//  list-style: none;
//}
//.mhy-account-center__menu li:nth-of-type(3), .mhy-account-center__menu li:nth-of-type(5) {
//  border-bottom: 1px solid #f0f0f0;
//}
//.mhy-side-menu .nuxt-link-active {
//  color: #00c3ff;
//}
//.mhy-side-menu__item {
//  padding: 0 20px;
//  line-height: 50px;
//  font-size: 14px;
//  color: #666;
//  display: -webkit-box;
//  display: -ms-flexbox;
//  display: flex;
//  -webkit-box-align: center;
//  -ms-flex-align: center;
//  align-items: center;
//  cursor: pointer;
//}
//.mhy-side-menu .nuxt-link-active .mhy-icon {
//  color: #00c3ff;
//}
//.mhy-side-menu__item .mhy-icon {
//  width: 18px;
//  font-size: 18px;
//  vertical-align: top;
//  display: inline-block;
//  color: #d9d9d9;
//  margin-right: 15px;
//}
//.mhy-icon {
//  font-size: inherit;
//}
//.iconfont {
//  font-family: "iconfont" !important;
//  font-size: 16px;
//  font-style: normal;
//  -webkit-font-smoothing: antialiased;
//  -moz-osx-font-smoothing: grayscale;
//}
//.icon-wodefatie:before {
//  content: "";
//}


</style>