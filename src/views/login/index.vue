<template>
  <div class="container">
    <!-- 登录区域 -->
    <div class="content">
      <el-tabs class="form" v-model="loginForm.loginType" style=" float:none;">
        <el-tab-pane label="账号密码登录" name="uname">
        </el-tab-pane>
        <el-tab-pane label="短信验证码登录" name="sms">
        </el-tab-pane>
      </el-tabs>

      <!-- 表单 -->
      <div class="form-cont">
        <el-form :model="loginForm" :rules="LoginRules" class="login-form" ref="ruleFormRef">

          <!-- 账号密码登录 -->
          <div v-if="loginForm.loginType == 'uname'">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" type="text" placeholder="账号">
                <template #prefix>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhanghao"></use>
                  </svg>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
                        @keyup.enter.native="getCode">
                <template #prefix>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mima"></use>
                  </svg>
                </template>
              </el-input>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">记住密码</el-checkbox>
          </div>

          <!-- 短信验证码登录 -->
          <div v-if="loginForm.loginType == 'sms'">
            <el-form-item prop="mobile">
              <el-input v-model="loginForm.mobile" type="text" auto-complete="off" placeholder="请输入手机号">
                <template #prefix>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shoujihao"></use>
                  </svg>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="mobileCode">
              <el-input v-model="loginForm.mobileCode" type="text" auto-complete="off" placeholder="短信验证码"
                        class="sms-login-mobile-code-prefix"
                        @keyup.enter.native="handleLogin">
                <template #prefix>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yanzhengma"></use>
                  </svg>
                </template>
                <template #suffix>
                  <span v-if="mobileCodeTimer <= 0" class="getMobileCode" @click="getSmsCode(ruleFormRef)" style="cursor: pointer;">获取验证码</span>
                  <span v-if="mobileCodeTimer > 0" class="getMobileCode">{{ mobileCodeTimer }}秒后可重新获取</span>
                </template>
              </el-input>
            </el-form-item>
          </div>

          <!-- 下方的登录按钮 -->
          <el-form-item style="width:100%;">
            <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
                       @click.native.prevent="getCode">
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>


        </el-form>
      </div>

    </div>

    <!-- footer -->
    <div class="footer">
      Copyright © 2023-2024 jinLonG.
    </div>

  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import type {FormInstance} from "element-plus";

const mobileCodeTimer = ref<number>(0);
let loginForm = reactive({
  loginType: "uname",
  username: "admin",
  password: "admin123",
  captchaVerification: "",
  mobile: "",
  mobileCode: "",
  rememberMe: false,
});
const loading = ref<boolean>(false);

const validatorPhone = (rule: any, value: any, callBack: any) => {
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的手机号码格式"));
  }
};

const LoginRules = {
  username: [{required: true, trigger: "blur", message: "用户名不能为空"}],
  password: [{required: true, trigger: "blur", message: "密码不能为空"}],
  mobile: [{validator: validatorPhone, trigger: "blur"}],
};

const handleLogin = () => {
  // 处理登录逻辑
};

const getCode = () => {

};

const ruleFormRef = ref<FormInstance>();
const getSmsCode = (ruleFormRef: FormInstance | undefined) => {
  if (mobileCodeTimer.value > 0) return;
  if (!ruleFormRef) return ;
  ruleFormRef.validate(valid => {
    if (!valid) return;
    mobileCodeTimer.value = 60;
    let msgTimer = setInterval(() => {
      mobileCodeTimer.value--;
      if (mobileCodeTimer.value <= 0) {
        clearInterval(msgTimer);
      }
    }, 1000);
  });
}


</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.container {
  // 元素
  width: 100%;
  height: 100%;
  background-color: $page-bg;
  //background-image: ;
  background-size: cover;
  // 定位
  position: absolute;
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

    .form {
      box-sizing: border-box;
      width: 320px;
      // - - - tab
      :deep(.el-tabs__content) {
        padding: 20px 0 0;
      }

      :deep(.el-tabs__item) {
        // 元素
        width: 160px;
        height: 56px;
        padding: 0;
        // 文字
        line-height: 56px;
        color: $normal;
      }

      :deep(.el-tabs__item.is-active) {
        font-weight: bold;
        color: #2F53EB;
      }

      :deep(.el-tabs__active-bar) {
        height: 3px;
        border-radius: 2px;
      }

    }

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