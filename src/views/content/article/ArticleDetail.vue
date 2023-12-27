<template>
  <div class="details-container">
    <div class="left-container">
      <div class="article-catalog blog-card card t-shadow">
        <div class="web-info-title">
          <svg-icon icon-class="mulu" class="icon" />
          目录
        </div>
        <MdCatalog :editorId="id" :scrollElement="scrollElement"/>
      </div>
    </div>
    <div class="right-container card t-shadow">
      <!-- 文章标题 -->
      <div class="article-title">{{ articleDetail.articleTitle }}</div>
      <div class="article-info">
        <!-- 是否置顶 -->
        <span v-if="articleDetail.articleTop">
          <span style="color:#ff7242">
            <svg-icon icon-class="zhiding" style="width: 1rem; height: 1rem; "/>置顶
          </span>
          <span class="separator">|</span>
        </span>

        <!--发表时间-->
        <svg-icon icon-class="riqi" style="width: 1rem; height: 1rem; "/>
        发表时间
        <span class="separator">|</span>

        <!--更新时间-->
        <svg-icon icon-class="riqi" style="width: 1rem; height: 1rem; "/>
        更新时间
        <span class="separator">|</span>

        <!--文章分类-->
        <svg-icon icon-class="category" style="width: 1rem; height: 1rem; "/>
        文章分类
        <span class="separator">|</span>

        <!-- 字数统计 -->
        <svg-icon icon-class="word" style="width: 1rem; height: 1rem; "/>
        字数统计: {{ wordNum }}
        <span class="separator">|</span>

        <!-- 阅读时长 -->
        <svg-icon icon-class="duration" style="width: 1rem; height: 1rem; "/>
        阅读时长: {{ readTime }} 分钟
      </div>
      <div class="article-content ">
        <MdPreview :editorId="id" v-model="articleDetail.articleContent" previewTheme="vuepress"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import SvgIcon from "@/components/general/icon/SvgIcon.vue";
import {onMounted, ref} from "vue";
import {MdPreview, MdCatalog} from 'md-editor-v3';
import api from "@/api";
import {useRouter} from "vue-router";

const router = useRouter();

let articleId = ref(router.currentRoute.value.params.id);
let articleDetail = ref<any>({});
let wordNum = ref(0);
let readTime = ref(0);

const id = 'preview-only';
const scrollElement = document.documentElement;

const getArticleDetail = async () => {
  await api.getArticleDetail(articleId.value).then(({data}) => {
    articleDetail.value = data;
    document.title = data.articleTitle;
    // 统计文章字数
    wordNum.value = deleteHTMLTag(data.articleContent).length;
    // 计算阅读时间
    readTime.value = Math.round(wordNum.value / 400);
  })
}

const deleteHTMLTag = (content: string) => {
  return content
      .replace(/<\/?[^>]*>/g, "")
      .replace(/[|]*\n/, "")
      .replace(/&npsp;/gi, "");
}

onMounted(() => {
  getArticleDetail();
})
</script>

<style scoped lang="scss">
.details-container {
  display: flex;
  width: 100%;
  min-height: 161vh; // 解决 footer 组件的缺陷
  justify-content: space-between;

  .left-container {
    flex: 1;
    display: flex;
    flex-direction: column;

    .blog-card {
      line-height: 2;
      padding: 1.25rem 1.5rem;
      margin-right: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .article-catalog {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 30px;
    }
  }

  .right-container {
    flex: 3;
    padding: 0 1.25rem 1.5rem;
    margin: 0 0 2.5rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .article-title {
      font-size: 35px;
      margin: 20px 0 8px;
      display: flex;
      justify-content: center;
    }

    .article-info {
      font-size: 85%;
      color: #858585;
      line-height: 2;
      margin: 0.375rem 0;
    }

    .article-content {
      width: 100%;
      max-width: 100%;
      padding: 0 1.25rem 1.5rem;

      :deep(.md-editor-previewOnly) {
        img {
          max-width: 100%;
        }
      }
    }
  }
}
</style>