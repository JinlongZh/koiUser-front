<template>
  <div class="im">
    <div class="wrapper" ref="container">
      <ImToolBar/>
      <router-view/>
    </div>
  </div>
</template>

<script setup lang="ts">

import ImToolBar from "@/views/content/im/components/ImToolBar.vue";
</script>

<style scoped lang="scss">
.im {
  width: 100vw;
  height: 100vh;
  background: url("/src/assets/images/Asuna.webp") no-repeat center;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 80vw;
    height: 83vh;
    margin: 0 auto;
    color: #fff;
    background-color: #fff;
    opacity: 0.7;
    border-radius: 16px;
    border: 1px solid #e0e0e0
  }
}
</style>