<template>
  <div class="home">
    <div class="left-container">
      <div class="blog-wrapper">
        <!-- 博主信息 -->
        <div class="blog-card author-wrapper card t-shadow">
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
            <svg-icon icon-class="github" class="social-svgIcon"/>
            <svg-icon icon-class="gitee" class="social-svgIcon"/>
            <svg-icon icon-class="qq" class="social-svgIcon"/>
          </div>
        </div>
        <!--网站信息-->
        <div class="blog-card notice-wrapper card t-shadow">
          <div class="web-info-title">
            <svg-icon icon-class="gonggao" style="width: 1.25rem; height: 1.25rem; margin-right: 8px"/>
            公告
          </div>
          <div style="font-size:0.875rem">
            静坐于万花筒，在绚烂中寻找那唯一的本源
          </div>
        </div>
      </div>


    </div>
    <div class="right-container">

    </div>
  </div>
</template>

<script setup lang="ts">


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

    .blog-card {
      line-height: 2;
      padding: 1.25rem 1.5rem;
      margin-right: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .blog-wrapper {

      .author-wrapper {
        position: sticky;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
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

          .social-svgIcon {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 1rem;
          }
        }
      }

      .notice-wrapper {
        position: sticky;
        color: #4c4948;
      }
    }

  }

  .right-container {
    flex: 3;
    height: 100px;
    background-color: green;

    .article-card {
      display: flex;
      align-items: center;
      height: 280px;
      width: 100%;
      margin-top: 20px;
    }
  }
}



</style>