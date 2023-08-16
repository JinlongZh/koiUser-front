<template>
  <div @click="abc">首页</div>
</template>

<script setup lang="ts">

import {inject} from "vue";
import {ProcessInterface} from "@/d.ts/plugins";

const $process = inject<ProcessInterface>("$process")!;

const abc = () => {
  $process.tipShow.error("哈哈我成功了");
}
</script>

<style scoped lang="scss">

</style>