<template>
  <div class="rightSide" :style="isShow">
    <svg-icon
        @click="backTop"
        class="sideItem"
        icon-class="backTop"
    >
    </svg-icon>
  </div>
</template>

<script setup lang="ts">

import {onBeforeUnmount, onMounted, ref} from "vue";
import SvgIcon from "@/components/general/icon/SvgIcon.vue";

const isShow = ref("");
const isOut = ref("rightSide-in");

onMounted(() => {
  window.addEventListener("scroll", scrollToTop);
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollToTop);
})

const scrollToTop = () => {
  let scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
  if (scrollTop > 20) {
    isShow.value = "opacity: 1;transform: translateX(-38px);";
  } else {
    isShow.value = "";
  }
}

// 回到顶部
const backTop = () => {
  window.scrollTo({
    behavior: "smooth",
    top: 0
  });
}

</script>

<style scoped lang="scss">
.rightSide {
  z-index: 4;
  position: fixed;
  right: -38px;
  bottom: 85px;
  transition: all 0.5s;

  .sideItem {
    height: 2rem;
    width: 2rem;
    cursor: pointer;
    margin: 0.5rem 0;

    &:hover {
      transform: scale(1.3);
      transition: transform 0.3s;
    }
  }

}

</style>