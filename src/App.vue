<template>
  <!--展示路由组件的区域-->
  <div class="container">
    <!--展示路由组件的区域-->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  min-width: 1080px;
  min-height: 788px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
