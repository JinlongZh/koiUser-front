<template>
  <div class="talkMd">
    <MdPreview
        v-model="content"
        :editorId="id"
        :showCodeRowNumber="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MdPreview  } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const props = defineProps(["content", "commentId"]);

const id = "talkId" + props.commentId;

const content = ref(props.content);


</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";

:deep(.md-editor-previewOnly) {
  background: none;
}

</style>
