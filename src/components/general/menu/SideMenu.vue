<template>
  <div class="side-menu">
    <!--左侧菜单-->
    <div class="container menu">
      <div class="menu_header">{{ name }}</div>

      <ul class="menu_list">
        <li v-for="(item, index) in menus" :key="index" @click="selMenu(item.path)">
          <a :class="'router_link menu_item '+ (activeIndex === item.path?'nuxt-link-active':'')">
            <img class="icon" :src="item.icon" alt=""/>
            <span>{{ item.word }}</span>
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
import {SideMenuConfigType} from "@/d.ts/config/site";

const $router = useRouter();

const activeIndex = ref<string>("/userCenter/userInfo");

const props = defineProps({
  name: String,
  menus: {
    type: Array as () => SideMenuConfigType,
    required: true
  }
})

onMounted(() => {
  // 设置默认选中第一个菜单项
  selMenu(props.menus[0].path);

  setInterval(() => {
    activeIndex.value = $router.currentRoute.value.path;
  }, 300);
});

const selMenu = (path: string) => {
  activeIndex.value = path;
  $router.push({path: path});
};

</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";
@import "@/assets/scss/div.scss";

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

      li:nth-of-type(3), li:nth-of-type(5) {
        border-bottom: 1px solid #f0f0f0;
      }

      .menu_item {
        padding: 0 20px;
        line-height: 50px;
        font-size: 14px;
        color: #666;
        display: flex;
        align-items: center;
        cursor: pointer;

        &.nuxt-link-active,
        &:hover {
          color: #00c3ff;
        }
      }

      .icon {
        width: 18px;
        font-size: 18px;
        vertical-align: top;
        display: inline-block;
        margin-right: 15px;
      }
    }
  }

  /*右侧内容*/
  .content {
    margin-left: 20px;
    width: 700px;
  }
}

</style>