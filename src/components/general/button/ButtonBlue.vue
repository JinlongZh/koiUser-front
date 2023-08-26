<template>
  <button class="button">编辑</button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 86px;
  height: 34px;
  background-color: #fff;
  color: #00b2ff;
  border: 1px solid #00c3ff;
  border-radius: 4px;
  transition-duration: .2s;
  transition-property: border-color, color;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    background-color: #00b2ff;
    color: #fff;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    text-decoration: none;
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>