<template>
  <div class="friend-wrap">
    <!-- 封面 -->
    <div class="favorite-header">
      <!-- 背景图片 -->
      <video class="index-video" autoplay="autoplay" muted="muted" loop="loop"
             src="/src/assets/images/hutao.mp4">
      </video>
    </div>

    <div class="friend-main">
      <!-- 添加友链 -->
      <div @click="clickLetter" class="form-wrap">
        <!-- 信封上面 -->
        <img class="before-img" src="/src/assets/images/friendLetterTop.png" style="width: 100%"/>
        <!-- 信 -->
        <div class="envelope" style="animation: hideToShow 2s">
          <div class="form-main">
            <img src="/src/assets/images/friendLetterMiddle.jpg" style="width: 100%"/>
            <div>
              <h3 style="text-align: center">有朋自远方来</h3>
              <div class="form-friend">
                <div class="form-friend-item">
                  <span>名称：</span>
                  <el-input maxlength="30" v-model="friendForm.linkName"></el-input>
                </div>
                <div class="form-friend-item">
                  <span>简介：</span>
                  <el-input maxlength="120" v-model="friendForm.linkIntro"></el-input>
                </div>
                <div class="form-friend-item">
                  <span>头像：</span>
                  <el-input maxlength="200" v-model="friendForm.linkAvatar"></el-input>
                </div>
                <div class="form-friend-item">
                  <span>网址：</span>
                  <el-input maxlength="200" v-model="friendForm.linkAddress"></el-input>
                </div>
              </div>
              <div class="submit-friend">
                <button class="k-btn k-btn-primary" @click="submit()" style="width:66px;height: 33px; margin: 10px 0">
                  提交
                </button>
              </div>
            </div>
            <div>
              <img src="/src/assets/images/friendLetterBiLi.jpg" style="width: 100%;margin: 5px auto;opacity: 0.8"/>
            </div>
            <p style="font-size: 12px;text-align: center;color: #999">欢迎交换友链</p>
          </div>
        </div>
        <img class="after-img" src="/src/assets/images/friendLetterBottom.png" style="width: 100%"/>
      </div>

      <!--友链展示-->
      <div class="friend-content">
        <div style="font-size: 20px;font-weight: bold;margin-top: 40px">🌸本站信息</div>
        <blockquote style="margin-top: 20px">
          <div>网站名称：{{ websiteStore.websiteName }}</div>
          <div>网址：{{ websiteStore.websiteAddress }}</div>
          <div>头像：{{ websiteStore.websiteAvatar }}</div>
          <div>描述：{{ websiteStore.websiteIntro }}</div>
        </blockquote>
        <div style="margin-top: 20px">
          需要交换友链的可在上方提交💖
        </div>
        <blockquote style="margin-top: 20px">
          友链信息展示需要，你的信息格式要包含：名称、介绍、链接、头像
        </blockquote>

        <hr>

        <div style="font-size: 20px;font-weight: bold;margin-top: 40px">⛳大佬链接</div>

        <div class="friend-link">
          <div class="friend-link-item" v-for="link in friendLinkList" @click="jumpPage(link.linkAddress)">
            <img :src="link.linkAvatar">
            <div class="friend-link-content">
              <div class="friend-link-title">
                {{ link.linkName }}
              </div>
              <div class="friend-link-description">
                {{ link.linkIntro }}
              </div>
              <div class="friend-link-links">
                <svg-icon iconClass="right"></svg-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {inject, onMounted, ref} from "vue";
import jQuery from "jquery";
import SvgIcon from "@/components/general/icon/SvgIcon.vue";
import {FriendLinkResp} from "@/d.ts/api/blog/friend";
import {listFriendLinks, submitFriendLink} from "@/api/blog/friend";
import useWebsiteStore from "@/store/website";
import {ProcessInterface} from "@/d.ts/modules/process";

const friendForm = ref({
  linkName: "",
  linkIntro: "",
  linkAvatar: "",
  linkAddress: ""
})

const websiteStore = useWebsiteStore();
const $process = inject<ProcessInterface>("$process")!;

const friendLinkList = ref([{} as FriendLinkResp]);

onMounted(() => {
  getFriendLink();
})

const getFriendLink = () => {
  listFriendLinks().then((res) => {
    friendLinkList.value = res.data;
  })
}

const jumpPage = (address: string) => {
  window.open(address, "_blank")
}

const clickLetter = () => {
  if (document.body.clientWidth < 700) {
    jQuery(".form-wrap").css({"height": "1000px", "top": "-200px"});
  } else {
    jQuery(".form-wrap").css({"height": "1150px", "top": "-200px"});
  }
}

const submit = () => {
  if (Object.values(friendForm.value).some(value => value == null || value.trim() === "")) {
    $process.tipShow.error("请填写完整");
    return ;
  }
  submitFriendLink(friendForm.value).then(() => {
    friendForm.value = {
      linkName: "",
      linkIntro: "",
      linkAvatar: "",
      linkAddress: ""
    }
    // jQuery(".form-wrap").css({"height": "530", "top": "447"});
    $process.tipShow.success("提交成功")
  })
}

</script>

<style scoped lang="scss">
.friend-wrap {
  max-width: 1200px;
  margin: 80px auto auto;

  .favorite-header {
    height: 330px;
    overflow: hidden;
    border-radius: 20px;
    max-width: 1200px;

    .index-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

  }

  .friend-main {
    max-width: 1200px;
    margin: 30px auto;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);

    .form-wrap {
      margin: 0 auto;
      overflow: hidden;
      width: 530px;
      height: 447px;
      position: relative;
      top: 0;
      transition: all 1s ease-in-out .3s;
      z-index: 0;
      cursor: pointer;

      .before-img {
        position: absolute;
        bottom: 126px;
        left: 0;
        background-repeat: no-repeat;
        width: 530px;
        height: 317px;
        z-index: -100;
      }

      .envelope {
        position: relative;
        margin: 0 auto;
        transition: all 1s ease-in-out .3s;
        padding: 200px 20px 20px;

        .form-main {
          background: #fff;
          box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
          margin: 0 auto;
          border-radius: 10px;
          overflow: hidden;

          .form-friend {
            margin-top: 12px;
            background-color: #eee;
            border: #ddd 1px solid;
            padding: 20px 0;
            display: flex;
            flex-direction: column;
            align-items: center;

            .form-friend-item {
              width: 60%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 15px;

              span {
                flex: 1;
              }

              :deep(.el-input) {
                flex: 5;
              }
            }
          }

          .submit-friend {
            margin-top: 20px;
            display: flex;
            justify-content: center;
          }
        }
      }

      .after-img {
        position: absolute;
        bottom: -2px;
        left: 0;
        background-repeat: no-repeat;
        width: 530px;
        height: 259px;
        z-index: 100;
      }

    }

    .friend-content {
      width: 100%;

      blockquote {
        line-height: 2;
        margin: 0;
        font-size: 15px;
        border-left: 0.2rem solid #59b1f5;
        padding: 10px 1rem !important;
        background: #ecf7fe;
        border-radius: 4px;
      }

      hr {
        position: relative;
        margin: 40px auto;
        border: 2px dashed #39c5bb;
        overflow: visible;

        &:before {
          position: absolute;
          top: -17px;
          left: 5%;
          color: #39c5bb;
          content: '✂';
          font-size: 30px;
          line-height: 1;
          transition: all 1s ease-in-out;

          &:hover {
            left: calc(95% - 20px);
          }
        }

        &:hover:before {
          left: calc(95% - 20px);
        }
      }

      .friend-link {
        display: flex;
        flex-wrap: wrap;
        padding: 15px 0;

        .friend-link-item {
          width: calc(100% / 2 - 20px);
          height: 150px;
          display: flex;
          position: relative;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.88);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
          overflow: hidden;
          margin: 10px;
          cursor: pointer;
          transition: box-shadow 0.3s ease;

          &:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.06);
          }

          img {
            width: 150px;
            height: 150px;
            border-radius: 0 50% 50% 0;
          }

          .friend-link-content {
            width: 100%;
            padding: 15px 20px;

            .friend-link-title {
              font-size: 18px;
              font-weight: bold;
              text-align: center;
            }

            .friend-link-description {
              line-height: 25px;
              margin-top: 10px;
              font-size: 14px;
            }

            .friend-link-links {
              position: absolute;
              right: 20px;
              bottom: 15px;
            }
          }
        }
      }
    }
  }

}
</style>