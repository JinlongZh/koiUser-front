<template>
  <div v-for="item in picList">
    <Image
        :url="item"
        width="200px"
        height="150px"
        radius="10px"
        :imgArray="picList"
    />
  </div>

</template>

<script setup lang="ts">

import Image from "@/components/general/image/Image.vue";
import {ref} from "vue";

const picList = ref(["/src/assets/images/bg.jpg", "/src/assets/images/bg.jpg"]);
</script>

<style scoped lang="scss">

</style>