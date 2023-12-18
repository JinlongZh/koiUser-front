<template>
  <div class="home">
    <div class="left-container">
      <div class="blog-wrapper">
        <!-- 博主信息 -->
        <div class="author-wrapper">
          <div class="avatar">
            <img src="@/assets/images/bg.jpg" alt="Avatar">
          </div>
          <!-- 博客名称 -->
          <div class="blog-name">
            JinLonG
          </div>
          <!-- 博客简介 -->
          <div class="motto">
            我的博客
          </div>
          <!-- 收藏按钮 -->
          <a class="collection-btn">
            加入书签
          </a>
          <!-- 社交信息 -->
          <div class="card-info-social">
            <a
                class="iconfont icongithub"
                style="font-size: 30px;"
            ></a>
            <a
                class="iconfont icongitee-fill-round"
                style="font-size: 30px;"
            ></a>
            <a
                class="iconfont iconfanhuidingbu"
                style="font-size: 30px;"
            ></a>
            <a
                class="iconfont iconqq"
                style="font-size: 30px;"
            ></a>
          </div>
        </div>
      </div>

      <div>
        daf
      </div>

    </div>
    <div class="right-container">

    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import SvgIcon from "@/components/general/icon/SvgIcon.vue";

const picList = ref(["/src/assets/images/bg.jpg", "/src/assets/images/bg.jpg"]);
</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.home {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;

  .left-container {
    flex: 1;
    display: flex;
    flex-direction: column;

    .blog-wrapper {
      .author-wrapper {
        position: sticky;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 15px;
        padding: 20px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 8px 6px rgba(7, 17, 27, .06);
        text-align: center;
        line-height: 2;
        color: #4c4948;

        .avatar {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: inherit;
          }
        }

        .blog-name {
          width: 100%;
          font-size: 1.375rem;
          margin-top: 0.625rem;
        }

        .motto {
          width: 100%;
          font-size: 0.875rem;
        }

        .collection-btn {
          width: 100%;
          text-align: center;
          z-index: 1;
          font-size: 14px;
          position: relative;
          display: block;
          background-color: #49b1f5;
          color: #fff !important;
          height: 32px;
          line-height: 32px;
          transition: color 1s;

          &:before {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            background: #ff7242;
            content: "";
            transition: transform 0.5s ease-out;
            transform: scaleX(0);
            transform-origin: 0 50%;
          }

          &:hover:before {
            transition: transform 0.5s cubic-bezier(0.45, 1.64, 0.47, 0.66);
            transform: scaleX(1);
          }
        }

        .card-info-social {
          width: 100%;
          height: 50px;
          padding: 8px;
          display: flex;
          justify-content: space-around;
          line-height: 40px;
          margin: 6px 0 -6px;
        }
      }
    }

  }

  .right-container {
    flex: 3;
    height: 100px;
    background-color: green;
  }
}

.svgIcon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
}

</style>