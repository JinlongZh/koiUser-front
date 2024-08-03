<template>
  <div class="chat-message">
    <ul v-infinite-scroll="load" :infinite-scroll-immediate="false">

    </ul>
  </div>
</template>

<script setup lang="ts">

// 加载更多
const load = () => {
  console.log("load")
}


</script>

<style scoped lang="scss">

.chat-message {
  width: 280px;
  height: 100%;

  ul {
    display: none;
    padding: 0;
    margin: 20px 10px;
    overflow-y: auto;
  }
}

</style>