<template>
  <div class="footer" :class="{ static: positionSwitch, fixed: !positionSwitch }">
    <div>
      © {{ $filters.year(websiteStore.websiteCreateTime) }} -
      {{ new Date().getFullYear() }} By
      {{ websiteStore.websiteAuthor }}
    </div>
    <a href="https://beian.miit.gov.cn/" target="_blank">
      {{ websiteStore.websiteRecordNo }}
    </a>
  </div>
</template>

<script setup lang="ts">
import {inject} from "vue";
import type {ProcessInterface} from "@/d.ts/modules/process";
import useWebsiteStore from "@/store/website";

const $process = inject<ProcessInterface>("$process")!;
const websiteStore = useWebsiteStore();

const positionSwitch = $process.footerPosition;

</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.footer {
  width: 100%;
  background: linear-gradient(90deg,#b7ba6b,#009ad6,#6950a1);
  color: #fff;
  line-height: 2;
  font-weight: bold;
  font-size: 14px;
  position: relative;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: 400% 400%;
  animation: Gradient 6s ease infinite;

  @keyframes Gradient {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }

}

.fixed {
  position: fixed;
  bottom: 0;
  text-align: center;
}

.static {
  align-items: center;
}
</style>