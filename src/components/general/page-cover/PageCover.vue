<template>
  <div>
    <div
        :style="{
        'background-image': `url(${bg})`,
      }"
        class="cover"
    >
      <div class="cover_content">
        <slot>
          <div class="cover_title">{{ title }}</div>
          <p>{{ subtitle }}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps(['bg', 'title', 'subtitle']);

</script>

<style lang="scss" scoped>
.cover {
  height: 60vh;
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .cover_content {
    color: #fff;
    position: relative;
    z-index: 9;
    text-align: center;
    letter-spacing: 1.2px;

    .cover_title {
      font-size: 30px;
      font-weight: 600;
    }

    p {
      font-size: 16px;
      opacity: 0.8;
      margin-top: 5px;
    }
  }
}

@media (max-width: 900px) {
  .content {
    .title {
      font-size: 26px !important;
    }

    p {
      font-size: 14px !important;
    }
  }
}

@media (max-width: 550px) {
  .content {
    .title {
      font-size: 22px !important;
    }

    p {
      font-size: 14px !important;
    }
  }
}
</style>
