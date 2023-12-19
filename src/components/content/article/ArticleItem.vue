<template>
  <div class="articleItem card t-shadow">
    <div class="cover"></div>
    <div class="article-wrapper">
      <div class="article-title">{{ data.articleTitle }}</div>
      <div class="article-info">
        <!-- 是否置顶 -->
        <span v-if="data.articleTop">
          <span style="color:#ff7242">
            <svg-icon icon-class="zhiding" style="width: 1rem; height: 1rem; "/>置顶
          </span>
          <span class="separator">|</span>
        </span>
        <!--发表时间-->
        <svg-icon icon-class="riqi" style="width: 1rem; height: 1rem; "/>
        {{ data.createTime }}
        <span class="separator">|</span>
        <!--文章分类-->
        <router-link :to="'/categories/' + data.categoryId">
          <svg-icon icon-class="category" style="width: 1rem; height: 1rem; "/>
          {{ data.categoryName }}
        </router-link>
      </div>
      <div class="article-content">
        {{ data.articleContent }}
      </div>
      <div class="articleFooter">
        <div class="data">
          <div class="views">阅读：{{ data.viewCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, ref} from "vue";

const {data, index} = defineProps(['data', 'index']);
const direction = computed(() => index % 2 === 0 ? 'row' : 'row-reverse');

// const cover = computed(() => `url(${data.value.cover})`);
const cover = ref(`url(https://img.xiaopaocampus.cn/stc_xp/images/avatarimg/1699703079761/pictureFileName.jpeg)`);
</script>

<style scoped lang="scss">
.articleItem {
  width: calc(100% - 5px);
  height: 280px;
  margin: 20px auto;
  border-radius: 5px;
  display: flex;
  font-size: 14px; // 字体
  flex-direction: v-bind(direction);
  cursor: pointer;

  &:hover {
    .cover {
      background-size: auto 110%;
    }
  }

  .cover {
    width: 45%;
    height: 100%;
    background-image: v-bind(cover);
    background-size: auto 100%;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 8px;
    transition: 0.6s;
  }

  .article-wrapper {
    width: 55%;
    padding: 10px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .article-title {
      min-height: 40px;
      font-size: 24px;
      text-align: center;
      line-height: 1.4;
    }

    .article-info {
      font-size: 95%;
      color: #858585;
      line-height: 2;
      margin: 0.375rem 0;
    }

    .article-content {
      line-height: 2;
      overflow: hidden;
      color: #4c4948;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }


    .articleFooter {
      width: 100%;
      margin-top: 10px;
      padding-top: 5px;
      line-height: 30px;
      font-size: 95%;
      color: #999;

      .data {
        display: flex;
        flex-direction: row-reverse;
      }
    }
  }
}
</style>