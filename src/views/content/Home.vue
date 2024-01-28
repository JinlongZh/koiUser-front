<template>
  <div class="page-home">
    <page-cover
        title="🏖️茶余饭后,聊聊天!"
        subtitle="生活不止有代码,别忘了还有诗和远方"
        bg="http://cdn.koicode.cn/system-image/097ad13f000f488bb94ffafa4444313d.png"
    ></page-cover>

    <main>
      <div class="left-container">
        <div class="blog-wrapper">
          <!-- 博主信息 -->
          <div class="blog-card author-wrapper">
            <div class="bg"></div>
            <div class="header">
              <img src="@/assets/images/bg.jpg" alt="Avatar">
            </div>
            <!-- 博客名称 -->
            <div class="blog-name">
              {{ websiteStore.websiteName }}
            </div>
            <!-- 博客简介 -->
            <div class="motto">
              {{ websiteStore.websiteIntro }}
            </div>
            <!-- 社交信息 -->
            <div class="concat">
              <div val="" class="item">
                <div class="val-box">
                  <span class="val">{{ websiteStore.qq }}</span>
                </div>
                <svg-icon icon-class="qq" />
              </div>
              <div class="item">
                <div class="val-box">
                  <span class="val">{{ websiteStore.github }}</span>
                </div>
                <svg-icon icon-class="email" />
              </div>
              <div class="item">
                <div class="val-box">
                  <span class="val">{{ websiteStore.gitee }}</span>
                </div>
                <svg-icon icon-class="gitee" />
              </div>
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
    </main>
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
import PageCover from "@/components/general/page-cover/PageCover.vue";

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

.page-home {
  width: 100%;

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
    top: 80px;

    .blog-wrapper {

      .blog-card {
        line-height: 2;
        padding: 1.25rem 1.5rem;
        margin-right: 1.25rem;
        margin-bottom: 1.5rem;
      }

      .author-wrapper {
        padding: 1px;
        text-align: center;
        color: #4c4948;
        border-radius: 6px;
        background: #fff;
        position: relative;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);

        .bg {
          width: 100%;
          height: 120px;
          background-image: url("http://cdn.koicode.cn/system-image/sakura.gif");
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 6px;

          &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 50%;
            bottom: 0;
            left: 0;
            background: linear-gradient(transparent, #fff);
          }
        }

        .header {
          width: 68px;
          height: 68px;
          background: #f5f5f5;
          border-radius: 50%;
          overflow: hidden;
          margin: 80px auto auto;
          position: relative;
          z-index: 9;
          border: 2px solid #fff;

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

        .concat {
          font-size: 18px;
          display: flex;
          justify-content: center;
          padding: 20px 0 15px;
          border-top: 1px solid #f5f5f5;
          margin-top: 20px;
          .item {
            width: 35px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            margin: 0 10px;
            border: 1px solid #999;
            border-radius: 50%;
            position: relative;
            .val-box {
              display: none;
              height: 50px;
              position: absolute;
              top: -45px;
              left: 50%;
              transform: translateX(-50%);
              z-index: 2;
              span {
                white-space: nowrap;
              }
              .val {
                background: #fff;
                font-size: 14px;
                padding: 10px 20px;
                border-radius: 40px;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
              }
            }
            &:hover {
              border-color: #2ebc3c;
              .val-box {
                display: block;
              }
            }
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