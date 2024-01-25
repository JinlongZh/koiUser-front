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
            <svg-icon icon-class="gonggao" class="icon"/>
            公告
          </div>
          <div class="web-info">
            {{ websiteStore.notice }}
          </div>
        </div>
        <!--网站资讯-->
        <div class="blog-card notice-wrapper card t-shadow">
          <div class="web-info-title">
            <svg-icon icon-class="chart-line" class="icon"/>
            网站资讯
          </div>
          <div class="web-info">
            <div style="padding:4px 0 0">
              运行时间:<span style="float: right;">{{ time }}</span>
            </div>
            <div style="padding:4px 0 0">
              总访问量:<span style="float: right;"> 5463 </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-container">
      <Wait :show="show" height="400px">
        <home-list :homeListData="homeListData"/>
      </Wait>
      <Pagination
          :total="total"
          :page-size="pageSize"
          :current="pageNo"
          :hide-on-single-page="false"
          :show-total="true"
          @pageChange="pageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import api from "@/api";
import {computed, onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {Wait} from "@/components/popup";
import HomeList from "@/components/content/home/HomeList.vue";
import {useRouter} from "vue-router";
import Pagination from "@/components/general/page/Pagination.vue";
import useWebsiteStore from "@/store/website";
import SvgIcon from "@/components/general/icon/SvgIcon.vue";

const router = useRouter();
const websiteStore = useWebsiteStore();

let timer: any = 0;
let show = ref(true);

let homeListData = reactive([]);
const time = ref("");

let pageNo = ref(1);
let pageSize = ref(8);
let total = ref(0)

const getHomeList = async () => {
  await api.pageHomeList({
    pageNo: pageNo.value,
    pageSize: pageSize.value
  }).then(({data}) => {
    homeListData = data.list;
    total.value = data.total;
    show.value = false;
  })
}

const pageChange = (target: number) => {
  router.push({
    path: "/",
    query: {
      page: target
    }
  });
  pageNo.value = target;
  // 展示加载动画
  show.value = true;
}

const runTime = () => {
  const timeold =
      new Date().getTime() -
      new Date(websiteStore.websiteCreateTime).getTime();
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysold = Math.floor(timeold / msPerDay);
  let str = "";
  const day = new Date();
  str += daysold + "天";
  str += day.getHours() + "时";
  str += day.getMinutes() + "分";
  str += day.getSeconds() + "秒";
  time.value = str;
}

watch(
    () => pageNo.value,
    () => {
      getHomeList();
    }
)

onBeforeMount(() => {
  pageNo.value = router.currentRoute.value.query.page ? Number(router.currentRoute.value.query.page) : 1;
  getHomeList();
})

onMounted(() => {
  runTime(); // 先执行一次
  // 设置定时器，每秒执行一次 runTime 函数
  timer = setInterval(runTime, 1000);
});

onBeforeMount(() => {
  clearInterval(timer);
  timer = 0;
});


</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.home {
  width: 100%;
  display: flex;
  justify-content: space-between;
  min-height: 101vh; // 解决 footer 组件的缺陷

  .left-container {
    width: 25%;
    display: flex;
    flex-direction: column;

    .blog-card {
      line-height: 2;
      padding: 1.25rem 1.5rem;
      margin-right: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .blog-wrapper {
      position: sticky;
      top: 30px;

      .author-wrapper {
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

        .web-info {
          padding: 0.25rem;
          font-size: 0.875rem;
        }
      }
    }

  }

  .right-container {
    width: 75%;
    padding: 0 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;

  }
}


</style>