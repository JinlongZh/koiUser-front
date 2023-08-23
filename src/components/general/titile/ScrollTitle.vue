<template>
  <div class="text-wrap"
       :style="{fontSize: fontSize, color: fontColor}"
       @mouseenter="showTip"
       @mouseleave="hideTip">

    <span class="text">{{ text }}</span>

    <div v-if="showBubble" class="bubble">
      <span class="bubble-text">{{ text }}</span>
      <div class="bubble-arrow"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

defineProps({
  text: String,
  fontSize: String,
  fontColor: String,
})

const showBubble = ref(false);

const showTip = () => {
  showBubble.value = true;
};

const hideTip = () => {
  showBubble.value = false;
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.text-wrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  padding: 10px;

  .bubble {
    position: absolute;
    top: -40px;
    left: 0;
    background: #fff;
    color: #333;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0,0,0,.2);
    transition: all 0.3s ease-in-out;
    opacity: 0;
    transform: translateY(10px);
    white-space: normal;
    max-width: 200px;

    &.show {
      opacity: 1;
      transform: translateY(0);
    }

    .bubble-text {
      display: block;
      word-break: break-word;
    }

    .bubble-arrow {
      position: absolute;
      bottom: -10px;
      left: 10px;
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }
  }

  &:hover {
    .bubble {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

</style>