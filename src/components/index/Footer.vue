<template>
  <div class="footer" :class="{ static: positionSwitch, fixed: !positionSwitch }">
    <div>Copyright © 2023-2024 jinLonG.</div>
    <div><span class="theme"
               @click="jumpPage(warehouseUrl)">主题 {{ footerConfig.theme }} | {{ footerConfig.techStack }}</span></div>
    <div><span class="zwfw" @click="jumpPage(zwfwUrl)">{{ footerConfig.zwfwCode }}</span></div>
  </div>
</template>

<script setup lang="ts">
import {footerConfig} from "@/config/site";
import {urlConfig} from "@/config/program";
import {inject} from "vue";
import type {ProcessInterface} from "@/d.ts/modules/process";

const $process = inject<ProcessInterface>("$process")!;

const zwfwUrl = urlConfig.zwfwUrl;
const warehouseUrl = urlConfig.warehouseUrl;
const positionSwitch = $process.footerPosition;
const jumpPage = (path: string) => {
  window.open(path);
}

</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.footer {
  width: 100%;
  height: 100px;
  background: rgba($color: $page-bg, $alpha: 0.7);
  color: $normal;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    height: 25px;
    line-height: 25px;
  }

  .theme, .zwfw {
    cursor: pointer;
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