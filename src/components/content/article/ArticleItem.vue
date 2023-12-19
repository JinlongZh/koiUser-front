<template>
  <div class="articleItem card t-shadow">
    <div class="cover"></div>
    <div class="article-wrapper">
      <div class="article-title">这是一个标题</div>
      <div class="article-info">
        <!-- 是否置顶 -->
        <span>
          <span style="color:#ff7242">
            <svg-icon icon-class="zhiding" style="width: 1rem; height: 1rem; "/>置顶
          </span>
          <span class="separator">|</span>
        </span>
        <!--发表时间-->
        <svg-icon icon-class="riqi" style="width: 1rem; height: 1rem; "/>
        2002-02-17
        <span class="separator">|</span>
        <!--文章分类-->
        <router-link :to="'/categories/' + 1">
          <svg-icon icon-class="category" style="width: 1rem; height: 1rem; "/>
          分类
        </router-link>
      </div>
      <div class="article-content">
        都市传说是日本动漫中常常出现的话题。故事就从乡下来到东京读高中的龙之峰帝人开始，从一个又一个的都市传说展开，向我们展示了一出出引人心弦的精彩剧目。
        无头骑士异闻录是一部优秀的群像剧。它的演出十分出色，并没有向其他动画一样主要以主角龙之峰帝人的视角来展开叙述，反而穿插了大量其他角色为视角展开的情节，配合大量的以第三人称展开的解说，不仅没有让人枯燥乏味，反而情节一波三折。乡下来的少年龙之峰帝人，主角的好友外向开朗的纪田正臣，文静腼腆的园原杏里，言辞轻佻的情报贩子折原临也，性格暴躁且力量惊人的平和岛静雄……这些毫无关系的角色，却因各种各样的原因被卷入一个个的事件中。前期毫无交集的角色，却因各种意外或人为推动而有所纠缠，也让前期看似毫无关系的事件有了一条贯通始终的主线，这种展开让人大呼过瘾。
      </div>
      <div class="articleFooter">
        <div class="data">
          <div class="views">阅读:34</div>
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