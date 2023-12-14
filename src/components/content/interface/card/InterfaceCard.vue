<template>
  <div class="interface-card card" @click="jumpDetail(id)">
    <div class="interface-header">
      <span class="interface-name">{{ name }}</span>
    </div>
    <div class="content">
      <div class="desc-content text">{{ description }}</div>
      <!-- 新添加的内容 -->
      <div class="additional-content">
        <div class="createTime">
          <CreateTime :create-time="createTime"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import CreateTime from "@/components/general/time/CreateTime.vue";

const router = useRouter();

defineProps({
  id: Number,
  name: String,
  description: String,
  createTime: String,
});

const jumpDetail = (id: number) => {
  window.open(router.resolve(`/interface/detail/${id}`).href, "_blank");
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.interface-card {
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  .interface-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 15px;
    background-color: #add8e6;
    border-bottom: 1px solid #f0f0f0;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;

    .interface-name {
      margin: 6px 0 0;
      font-size: 16px;
      color: #333333;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 15px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    display: flex;
    flex-direction: column;

    .desc-content {
      line-height: 24px;
      height: 55px;
      border-bottom: 1px solid #ebebeb;
      margin-top: 8px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      word-break: break-word;
      word-wrap: break-word;
    }

    .additional-content {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      font-size: 12px;

      .createTime {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
