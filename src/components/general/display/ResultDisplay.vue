<template>
  <div class="result-display" :style="{ height: containerHeight + 'px' }">
    <pre v-if="!isImage" class="json">{{ result }}</pre>
    <img v-if="isImage" :src="result" alt="Result Image" />
    <div class="resize-handle" @mousedown="startResize"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, onMounted, onUnmounted } from 'vue';

interface Props {
  result: string | object;
}

const props = defineProps<Props>();
const containerHeight = ref(200);
let isResizing = false;
let initialHeight = 0;

const isImage = computed(() => {
  const imageRegex = /\.(png|jpe?g|gif|svg|webp|bmp)(\?.*)?$/i;
  return typeof props.result === 'string' && imageRegex.test(props.result);
});

const startResize = (event: MouseEvent) => {
  isResizing = true;
  initialHeight = event.clientY;

  document.addEventListener('mousemove', handleResize);
  document.addEventListener('mouseup', stopResize);
}

const handleResize = (event: MouseEvent) => {
  if (isResizing) {
    const newHeight = containerHeight.value + (event.clientY - initialHeight);
    containerHeight.value = Math.max(newHeight, 100); // 设置最小高度
    initialHeight = event.clientY;
  }
}

const stopResize = () => {
  isResizing = false;
  document.removeEventListener('mousemove', handleResize);
  document.removeEventListener('mouseup', stopResize);
}

onMounted(() => {
  containerHeight.value = Math.max(containerHeight.value, 100); // 设置初始最小高度
});

onUnmounted(() => {
  document.removeEventListener('mousemove', handleResize);
  document.removeEventListener('mouseup', stopResize);
});
</script>

<style scoped lang="scss">
.result-display {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  overflow: auto;
  resize: vertical;
  border-radius: 4px;

  img {
    max-width: 100%;
    margin-top: 10px;
  }

  .json {
    font-family: Consolas, monospace;
  }

  .resize-handle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: #ccc;
    cursor: nwse-resize;
  }
}
</style>