<template>
  <div class="interface-card card">
    <div class="interface-header">
      <span class="interface-name title-600">{{ name }}</span>
    </div>
    <div class="content">
      <div class="desc-content text">{{ description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  id: Number,
  name: String,
  description: String,
})

</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.interface-card {
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;

  .interface-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;

    .interface-name {
      margin: 12px 0 0;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 10px;

    .desc-content {
      line-height: 20px;
      height: 60px;
      margin-top: 8px;
      -webkit-line-clamp: 3;

      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      word-break: break-word;
      word-wrap: break-word;
    }
  }
}

</style>