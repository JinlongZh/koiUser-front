<template>
  <div class="error-page">
    <img class="img" :src="pageUrl"/>
    <div class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';

const errorType = ref(useRouter().currentRoute.value.params.type);
const pageUrl = ref("");
const errorMessage = ref<string>("");

const getErrorMessage = () => {
  switch (errorType.value) {
    case '404':
      pageUrl.value = "/src/assets/images/404.png";
      errorMessage.value = 'Page not found';
      break;
    case '500':
      pageUrl.value = "/src/assets/images/500.png";
      errorMessage.value = 'Internal server error';
      break;
      // 添加其他错误类型的消息
    default:
      pageUrl.value = "/src/assets/images/error.png";
      errorMessage.value = 'An error occurred';
  }
};

onMounted(() => {
  getErrorMessage();
})
</script>

<style scoped lang="scss">
.error-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 88vh;

  .img {
    width: 500px;
    height: 500px;
  }

  .error-message {
    font-size: 24px;
    font-weight: bold;
  }
}


</style>