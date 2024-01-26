<template>
  <div class="page-article-detail">
    <page-cover
        title="🏖️茶余饭后,聊聊天!"
        subtitle="生活不止有代码,别忘了还有诗和远方"
        bg="http://cdn.koicode.cn/system-image/9af3840152294a18836ac9786c3930ec.jpg"
    ></page-cover>

    <main>
      <div class="left-container">
        <div class="article-catalog blog-card card t-shadow">
          <div class="web-info-title">
            <svg-icon icon-class="mulu" class="icon"/>
            目录
          </div>
          <MdCatalog class="catalog-content" :editorId="editorId" :scrollElement="scrollElement"/>
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
          <MdPreview
              :editorId="editorId"
              v-model="articleDetail.articleContent"
              previewTheme="vuepress"
          />
        </div>
        <!--评论-->
        <Comment
            :commentType="CommentApiType.article"
            :topic-id="articleId"
        />
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">

import SvgIcon from "@/components/general/icon/SvgIcon.vue";
import {computed, onMounted, ref} from "vue";
import {MdPreview, MdCatalog} from 'md-editor-v3';
import api from "@/api";
import {useRouter} from "vue-router";
import Comment from "@/components/content/comment/Comment.vue";
import {CommentApiType} from "@/config/constant";
import PageCover from "@/components/general/page-cover/PageCover.vue";

const router = useRouter();

let articleId = ref(router.currentRoute.value.params.id);
let articleDetail = ref<any>({});
let wordNum = ref(0);
let readTime = ref(0);

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

const editorId = computed((): string => {
  let str = "article" + articleId.value
  return str.replace(/\W/g, "");
})

onMounted(() => {
  getArticleDetail();
})
</script>

<style scoped lang="scss">
.page-article-detail {

  main {
    max-width: 1200px;
    display: flex;
    align-items: flex-start;
    position: relative;
    z-index: 9;
    margin: -80px auto auto;
  }

  .left-container {
    width: 25%;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 30px;

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

      .catalog-content {
        overflow-y: auto;
        max-height: 600px;
      }
    }
  }

  .right-container {
    width: 75%;
    padding: 0 2.5rem 3rem;
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

      :deep(.md-editor-previewOnly) {
        img {
          max-width: 100%;
        }
      }
    }
  }
}
</style>