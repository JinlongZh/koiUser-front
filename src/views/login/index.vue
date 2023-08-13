<template>
  <div class="container">
    <!-- 登录区域 -->
    <div class="content">
      <el-tabs class="form" v-model="loginType" style=" float:none;">
        <el-tab-pane label="账号密码登录" name="uname">
        </el-tab-pane>
        <el-tab-pane label="短信验证码登录" name="sms">
        </el-tab-pane>
      </el-tabs>
      <Login/>
    </div>

    <!-- footer -->
    <div class="footer">
      Copyright © 2023-2024 jinLonG.
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Login from "@/components/login/Login.vue";
// 登陆类型
const loginType = ref("uname");

</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.container {
  // 元素
  width: inherit;
  height: inherit;
  background-color: $page-bg;
  //background-image: ;
  background-size: cover;
  // 定位
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // 文字
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;


  .content {
    width: 400px;
    padding: 20px;
    background-color: $white;
    color: $black;
    border: 1px solid $gray-light;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba($color: $black, $alpha: 0.7);

  }

  .footer {
    // 元素
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    color: #8c8c8c;
    // 定位
    position: absolute;
    bottom: 30px;
    a,
    a:hover,
    a:active {
      color: inherit;
      text-decoration: none;
    }
  }
}

</style>