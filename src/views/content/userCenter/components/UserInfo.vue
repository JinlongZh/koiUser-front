<template>
  <div>
    {{ obj.output }}
    <span class="easy-typed-cursor">|</span>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import EasyTyper from 'easy-typer-js'

const obj = ref({
  output: "",
  isEnd: false,
  speed: 80,
  singleBack: false,
  sleep: 0,
  type: "rollback",
  backSpeed: 40,
  sentencePause: true
})

const init = () => {
  fetchData()
}

const fetchData = () => {
  fetch('https://v1.hitokoto.cn')
      .then(res => res.json())
      .then(({ hitokoto }) => {
        initTyped(hitokoto)
      })
      .catch(err => {
        console.error(err)
      })
}

const initTyped = (input: string, fn?: () => void, hooks?: any) => {
  const typed = new EasyTyper(obj.value, input, fn, hooks)
}

onMounted(() => {
  init()
})

</script>

<style scoped lang="scss">



</style>