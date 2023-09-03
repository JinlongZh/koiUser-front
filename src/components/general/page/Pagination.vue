<template>
  <div class="pagination">
    <div class="pager prev" @click="pageChange(currentPage - 1)">&#60;</div>
    <template v-for="item in leftPage" :key="item">
      <div
          v-if="typeof item === 'string' || item > 0"
          :class="{current: currentPage === item, number: typeof item === 'number'}"
          @click="pageChange(item)"
      >
        {{ item }}
      </div>
    </template>
    <template v-for="item in rightPage" :key="item">
      <div
          v-if="typeof item === 'string' || item <= pages"
          :class="{current: currentPage === item, number: typeof item === 'number'}"
          @click="pageChange(item)"
      >
        {{ item }}
      </div>
    </template>
    <div class="pager next" @click="pageChange(currentPage + 1)">&#62;</div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";

const emit = defineEmits(["pageChange"]);
const props = defineProps({
  total: Number,
  initPage: Number,
  size: Number,
})

const width = ref("200px");
const total = props.total || 0;
const size = props.size || 10;
const pages = Math.ceil(total / size);
const currentPage = ref(props.initPage || 1);
const prevCursor = ref("default");
const nextCursor = ref("default");
const leftPage = ref<(number | string)[]>([]);
const rightPage = ref<(number | string)[]>([]);

const pageChange = (target: number | string) => {
  if (typeof target === 'string' || target < 1 || target > pages) return;
  currentPage.value = target;
  pageListChange(target);
  pagerCursor(target)
  emit("pageChange", target);
};

const pagerCursor = (target: number) => {
  prevCursor.value = target === 1 ? "default" : "pointer";
  nextCursor.value = target === pages ? "default" : "pointer";
};

const pageListChange = (target: number) => {
  leftPage.value = target - 1 > 3
      ? leftPage.value = [1, "…", target - 2, target - 1, target]
      : leftPage.value = [target - 3, target - 2, target - 1, target];
  rightPage.value = pages - target > 3
      ? [target + 1, target + 2, "…", pages]
      : [target + 1, target + 2, target + 3];
};

onMounted(() => {
  if (pages > 5) {
    width.value = "300px";
  }
  pageListChange(currentPage.value);
  pagerCursor(currentPage.value);
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";

.pagination {
  width: v-bind(width);
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  color: $normal;

  .pager {
    cursor: pointer;
  }

  .prev {
    cursor: v-bind(prevCursor);
  }

  .next {
    cursor: v-bind(nextCursor);
  }

  .number {
    cursor: pointer;
  }
}

.current {
  color: rgb(107, 158, 255);
  cursor: default !important;
}

.ellipsis {
  cursor: default !important;
}
</style>