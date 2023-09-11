<template>
  <div class="login-container">


    <div class="left-container">
      <!-- 标题 -->
      <div class="title">
        <span>Arriving In&nbsp;</span>
        <span class="month">{{ currentMonth }}</span>
      </div>
      <!-- 时间盒子 -->
      <div class="time-box">
        <!-- 日 -->
        <div class="box">
          <span class="text1">{{ days }}</span>
          <span class="text2">days</span>
        </div>
        <!-- 时 -->
        <div class="box">
          <span class="text1">{{ hours }}</span>
          <span class="text2">hours</span>
        </div>
        <!-- 分 -->
        <div class="box">
          <span class="text1">{{ minutes }}</span>
          <span class="text2">mins</span>
        </div>
      </div>
    </div>


    <div class="right-container">
      <!-- 标题 -->
      <div class="title">
        <div class="box1">
          <span class="icon">☐</span>
          <span class="text">KOI-SPACE</span>
        </div>
        <div class="box2">
          This is a website address for my space.
        </div>
      </div>
      <!-- 登录区域 -->
      <div class="content">
        <div class="title-box">
          <div class="notice">
            Choose your login type
          </div>
          <!-- 选项卡 -->
          <div class="tabs">
            <div class="tab" :class="{ active: loginForm.loginType === 'uname' }"
                 @click="loginForm.loginType = 'uname'">
              密码
            </div>
            <div class="line">\</div>
            <div class="tab" :class="{ active: loginForm.loginType === 'sms' }" @click="loginForm.loginType = 'sms'">
              短信
            </div>
          </div>
        </div>


        <!-- 表单 -->
        <div class="form-cont">
          <el-form :model="loginForm" :rules="LoginRules" class="login-form" ref="ruleFormRef">

            <!-- 账号密码登录 -->
            <div class="uname" v-if="loginForm.loginType == 'uname'">
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
                <el-input style="margin-top: 5px;" v-model="loginForm.password"
                          :type="showPassword ? 'text' : 'password'" auto-complete="off"
                          placeholder="密码" @keyup.enter.native="getCode">
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
            <div class="sms" v-if="loginForm.loginType == 'sms'">
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
                <el-input style="margin-top: 5px;" v-model="loginForm.mobileCode" type="text" auto-complete="off"
                          placeholder="短信验证码"
                          class="sms-login-mobile-code-prefix" @keyup.enter.native="handleLogin">
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
              <el-button :loading="loading" size="default" type="primary" style="width:100%;"
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

  </div>
</template>

<script setup lang="ts">
import {computed, inject, onBeforeUnmount, onMounted, reactive, ref} from "vue";
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
import {LoginResp} from "@/d.ts/api/system/login.d.ts";

const route = useRoute();
const router = useRouter();

const $process = inject<ProcessInterface>("$process")!;

const mobileCodeTimer = ref<number>(0);

const showPassword = ref<boolean>(false);
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
}

// 计算开始时间
const startTime: Date = new Date("2023-07-01");

// 当前时间
const currentTime = ref<Date>(new Date());

// 计算剩余时间
const remainingTime = computed(() => {
  const diff: number = currentTime.value.getTime() - startTime.getTime();
  const days: number = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours: number = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes: number = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes };
});

// 解构剩余时间
const days = computed(() => remainingTime.value.days);
const hours = computed(() => remainingTime.value.hours);
const minutes = computed(() => remainingTime.value.minutes);

// 获取当前月份
const currentMonth = computed(() => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[currentTime.value.getMonth()];
});

// 更新当前时间
const updateCurrentTime = () => {
  currentTime.value = new Date();
};


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

  // 在组件挂载后开始计时
  const timerId = setInterval(updateCurrentTime, 1000);
  // 在组件销毁时清除计时器
  onBeforeUnmount(() => {
    clearInterval(timerId);
  });
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
@import "@/assets/scss/index.scss";

.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden; //不清楚为何会多出一部分

  .left-container {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: url("../../assets/images/bg.jpg") no-repeat;
    background-size: cover;

    .title {
      color: #fff;
      font-size: 30px;
      font-weight: bold;
      .month {
        font-size: 38px;
        color: $orange-light;
      }
    }

    .time-box {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .box {
        padding: 20px 25px;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        color: #fff;
        margin: 10px 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .text1 {
          border-bottom: 1px solid #fff;
          padding: 0 15px 10px;
          font-size: 30px;
          font-weight: bold;
        }

        .text2 {
          padding-top: 10px;
        }
      }
    }
  }

  .right-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 30%;
    height: 100vh;

    .title {
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .box1 {
        margin: 50px 0;
        display: flex;
        align-items: center;

        .icon {
          width: 15px;
          height: 15px;
          padding: 1.5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          font-weight: bold;
          transform: rotate(45deg);
          background-color: #7c8bfb;
          color: #fff;
          border-radius: 2px;
        }

        .text {
          font-size: 25px;
          font-weight: bold;
          color: #7c8bfb;
          margin-left: 10px;
        }
      }

      .box2 {
        font-weight: bold;
        font-size: 22px;
        line-height: 40px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
    }

    .content {
      width: 80%;
      color: $black;
      background-color: rgba($white, 0.6);
      border-radius: 4px;

      .title-box {
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      .notice {
        font-weight: bold;
        margin-bottom: 10px;
      }

      .tabs {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .line {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-right: 10px;
          color: #8c8c8c;


        }

        .tab {
          text-align: center;
          cursor: pointer;
          margin-right: 10px;
          font-size: 15px;

          &:last-child {
            margin-right: 0;
          }

          &.active {
            // border-bottom: 2px solid #7c8bfb;
            color: #7c8bfb;

          }

          &.active:before {
            content: "";
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #7c8bfb;
          }
        }
      }

      .form-cont {
        width: 100%;
        height: 100%;
        margin: 0 auto;

        .login-form {
          padding: 20px 0;

          :deep(.el-form-item) {
            margin-bottom: 15px;
          }

          // 密码登录
          .uname {
            height: 150px;
            // background-color: #7c8bfb;

            :deep(el-input__wrapper) {
              width: 100%;

              :deep(.el-input__prefix) {
                width: 30px;
                height: 30px;
                // line-height: 30px;
                text-align: center;
                background-color: #ffffff;
                border-radius: 50%;
                margin-right: 10px;
              }

              :deep(.el-input__inner) {
                width: 100%;
                height: 56px;
                background: #f5f5f5;
                border: 0;
                border-radius: 28px;
                text-align: center;
                line-height: 19px;
                color: #262626;
              }

              :deep(.el-input__suffix) {
                cursor: pointer;
              }
            }

            .el-checkbox {
              margin: 0 0 25px 0;
            }

            .getMobileCode {
              cursor: pointer;
              color: blue;
            }
          }

          // 短信登录
          .sms {
            height: 150px;
            display: flex;
            flex-direction: column;
          }

          .el-button {
            width: 90%;
            height: 38px;
            padding: 10px;
            cursor: pointer;
            background-color: #7c8bfb;
            color: #fff;
            border: none;
            border-radius: 5px;

            &:hover {
              background-color: #a4afff;
            }
          }

        }
      }

    }

    .footer {
      // 元素
      margin-bottom: 30px;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      color: #8c8c8c;
      // 定位

      a,
      a:hover,
      a:active {
        color: inherit;
        text-decoration: none;
      }
    }
  }
}
</style>