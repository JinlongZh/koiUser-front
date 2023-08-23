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
              <el-input v-model="loginForm.password" :type="showPassword ? 'text' : 'password'" auto-complete="off" placeholder="密码"
                        @keyup.enter.native="getCode">
                <template #prefix>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mima"></use>
                  </svg>
                </template>
                <template #suffix>
                  <svg class="icon" aria-hidden="true" @click="toggleShowPassword" style="cursor: pointer">
                    <use xlink:href="#icon-yanjing"></use>
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
                  <span v-if="mobileCodeTimer <= 0" class="getMobileCode" @click="getSmsCode()"
                        style="cursor: pointer;">获取验证码</span>
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
import {inject, onMounted, reactive, ref} from "vue";
import {
  getPassword,
  getRememberMe,
  getUsername,
  removePassword,
  removeRememberMe,
  removeUsername, setPassword, setRememberMe, setToken,
  setUsername
} from "@/utils/auth";
import type {FormInstance} from "element-plus";
import {useRoute, useRouter} from "vue-router";
import {login} from "@/api/system/login.ts";
import {ProcessInterface} from "@/d.ts/modules/process";
import {LoginResp} from "@/d.ts/api/login.d.ts";

const route = useRoute();
const router = useRouter();

const $process = inject<ProcessInterface>("$process")!;

const mobileCodeTimer = ref<number>(0);

const showPassword = ref<boolean>(false);
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
}

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
let redirect = ref<string>();

onMounted(() => {
  redirect.value = route.query.redirect ? decodeURIComponent(<string>route.query.redirect) : undefined;
  getCookie();
})

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

const getCookie = () => {
  const username = getUsername();
  const password = getPassword();
  const rememberMe = getRememberMe();

  loginForm.username = username ? username : loginForm.username;
  loginForm.password = password ? password : loginForm.password;
  loginForm.rememberMe = rememberMe ? rememberMe : false;

}

const handleLogin = () => {
  // 处理登录逻辑
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      // 设置 Cookie
      if (loginForm.rememberMe) {
        setUsername(loginForm.username)
        setPassword(loginForm.password)
        setRememberMe(loginForm.rememberMe)
      } else {
        removeUsername()
        removePassword()
        removeRememberMe()
      }
      // 发起登陆
      if (loginForm.loginType == "uname") {
        await unameLogin();
      }
    }
  });

};

const unameLogin = async () => {
  const params = {
    mobile: loginForm.username,
    password: loginForm.password
  }
  try {
    await login(params).then(res => {
      afterLoginSuccess(res);
    });
  } finally {
    loading.value = false;
  }
}

const afterLoginSuccess = (res: LoginResp) => {
  setToken(res.data);
  $process.tipShow.success("登录成功");
  router.push({
    path: redirect.value || "/"
  }).catch(() => {
    $process.tipShow.error("重定向失败");
  });
}

const getCode = () => {
  handleLogin();
};

const ruleFormRef = ref<FormInstance>();
const getSmsCode = () => {
  if (mobileCodeTimer.value > 0) return;

  ruleFormRef.value.validate((valid) => {
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
  background-image: url("@/assets/images/bg.jpg");
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
    width: 500px;
    height: 400px;
    padding: 20px;
    background-color: $page-bg;
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