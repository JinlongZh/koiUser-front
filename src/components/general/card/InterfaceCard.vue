<template>
  <div class="interface-card card">
    <div class="interface-header">
      <span class="interface-name title">接口名字</span>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.interface-card {
  width: 300px;
  height: 150px;

  .interface-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;

    .interface-name {
      margin: 12px 0 8px;
    }
  }
}

</style>