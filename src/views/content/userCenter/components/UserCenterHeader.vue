<template>
  <div class="container user_center_header">
    <div class="avatar">
      <img src="https://img-static.mihoyo.com/communityweb/upload/c9d11674eac7631d2210a1ba20799958.png"
           class="active_img">
    </div>
    <div class="user_info">
      <div class="header">
        <div class="name_id">
          <span class="nickname">{{ $user.userInfo.nickname }}</span>
          <span class="uid">UID:{{ $user.userInfo.id }}</span>
        </div>
        <!--编辑按钮-->
        <ButtonBlue/>
      </div>

      <div class="user_intro">
        <svg class="icon" aria-hidden="true" style="color: #ad4e69;margin-right: 10px;font-size: 18px;">
          <use xlink:href="#icon-tickets"></use>
        </svg>
        <p>{{ $user.userInfo.remark }}</p>
      </div>
      <div class="user_intro">
        <svg class="icon" aria-hidden="true" style="color: #00c3ff;margin-right: 10px;font-size: 18px;">
          <use xlink:href="#icon-iP"></use>
        </svg>
        <p>IP属地：{{ $user.userInfo.loginIp }}</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonBlue from "@/components/general/button/ButtonBlue.vue";
import useUserStore from "@/store/modules/user";

const $user = useUserStore();
</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.user_center_header {
  padding: 20px 50px 24px;
  margin: 20px 0;
  display: flex;

  .avatar {
    display: inline-block;
    position: relative;
    width: 120px;
    height: 120px;
    margin-right: 24px;

    .active_img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid #ebebeb;
      vertical-align: top;
    }
  }

  .user_info {
    flex-grow: 1;
    height: 100%;

    .header {
      display: flex;
      justify-content: space-between;


      .name_id {
        display: flex;
        flex-direction: column;

        .nickname {
          font-size: 16px;
          line-height: 21px;
          font-weight: 600;
        }

        .uid {
          margin-top: 5px;
          font-size: 12px;
          color: #ccc;
        }
      }
    }

    .user_intro {
      margin: 12px 8px 0 0;
      font-size: 14px;
      line-height: 18px;
      color: $normal;
      display: flex;

      p {
        margin: 0;
        padding: 0;
        outline: none;
      }
    }
  }
}
</style>