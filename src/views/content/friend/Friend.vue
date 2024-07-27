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
                <div class="user-title">
                  <div>名称：</div>
                  <div>简介：</div>
                  <div>封面：</div>
                  <div>网址：</div>
                </div>
                <div class="user-content">
                  <div>
                    <el-input maxlength="30" v-model="friend.title"></el-input>
                  </div>
                  <div>
                    <el-input maxlength="120" v-model="friend.introduction"></el-input>
                  </div>
                  <div>
                    <el-input maxlength="200" v-model="friend.cover"></el-input>
                  </div>
                  <div>
                    <el-input maxlength="200" v-model="friend.url"></el-input>
                  </div>
                </div>
              </div>
              <div class="submit-friend" style="margin-top: 20px; display: flex; justify-content: center">
                <button class="k-btn k-btn-primary" style="width:66px;height: 33px">
                  提交
                </button>
              </div>
            </div>
            <div>
              <img src="/src/assets/images/friendLetterBiLi.jpg" style="width: 100%;margin: 5px auto"/>
            </div>
            <p style="font-size: 12px;text-align: center;color: #999">欢迎交换友链</p>
          </div>
        </div>
        <img class="after-img" src="/src/assets/images/friendLetterBottom.png" style="width: 100%"/>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import jQuery from "jquery";

const friend = ref({
  title: "",
  introduction: "",
  cover: "",
  url: ""
})

const clickLetter = () => {
  if (document.body.clientWidth < 700) {
    jQuery(".form-wrap").css({"height": "1000px", "top": "-200px"});
  } else {
    jQuery(".form-wrap").css({"height": "1150px", "top": "-200px"});
  }
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

            .user-title {
              text-align: right;
              user-select: none;
            }

            .user-content {
              text-align: left;
            }
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
  }

}
</style>