<template>
  <el-button text @click="open">Click to open the Message Box</el-button>
  <el-button type="primary">Primary</el-button>
</template>

<script setup lang="ts">
import type { Action } from 'element-plus'

const open = () => {
  ElMessageBox.alert('This is a message', 'Title', {
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'error',
        message: `action: ${action}`,
      })
    },
  })
}
</script>

<style scoped lang="scss">

</style>