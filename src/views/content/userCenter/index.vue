<template>
  <div class="user-center">
    <div class="layout">
      <!--顶部头像栏-->
      <UserCenterHeader/>
      <!--菜单栏-->
      <SideMenu/>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserCenterHeader from "@/views/content/userCenter/components/UserCenterHeader.vue";
import SideMenu from "@/components/general/menu/SideMenu.vue";


</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";
@import "@/assets/scss/userCerter.scss";

.user-center {
  width: 100%;
  height: 100%;
  //background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;

  .layout {
    width: 1000px;
    margin: 0 auto;
    padding-left: 100px;
    padding-right: 100px;
    box-sizing: content-box;

  }
}
</style>