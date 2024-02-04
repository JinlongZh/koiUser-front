<template>
  <div class="container">
    <div class="login-card card t-shadow">
      <div class="form-box" :class="{ moveRight: showRegister }">
        <!-- 注册 -->
        <div class="register-box" v-show="showRegister">
          <h1>注册</h1>
          <el-form :model="loginForm" :rules="loginRules" class="login-form" ref="registerFormRef">
            <el-form-item prop="username">
              <el-input size="large" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input size="large" v-model="loginForm.password" type="password" show-password
                        placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
          <button class="k-btn k-btn-primary" @click="register">注册</button>
        </div>
        <!-- 登录 -->
        <div class="login-box" v-show="!showRegister">
          <h1>登录</h1>
          <el-form :model="loginForm" :rules="loginRules" class="login-form" ref="loginFormRef">
            <el-form-item prop="username">
              <el-input size="large" v-model="loginForm.username" type="text" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input style="margin-top: 5px;"
                        size="large"
                        v-model="loginForm.password"
                        show-password
                        auto-complete="off"
                        placeholder="请输入密码"
              >
              </el-input>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">下次自动登录</el-checkbox>
          </el-form>
          <button class="k-btn k-btn-primary" @click="handleLogin(loginFormRef)">
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </button>
        </div>
      </div>
      <div class="overlay" :class="{ moveLeft: showRegister }"/>
      <div class="con-box left">
        <h2>欢迎来到<span>登录页</span></h2>
        <p>已有账号</p>
        <button @click="showLoginForm">去登录</button>
      </div>
      <div class="con-box right">
        <h2>欢迎来到<span>注册页</span></h2>
        <p>没有有账号</p>
        <button @click="showRegisterForm">去注册</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {ProcessInterface} from "@/d.ts/modules/process";
import {FormInstance} from "element-plus";
import {
  getPassword,
  getRememberMe,
  getUsername, removePassword, removeRememberMe,
  removeUsername,
  setPassword,
  setRememberMe, setToken,
  setUsername
} from "@/utils/auth";
import {LoginResp} from "@/d.ts/api/system/login";
import {login} from "@/api/system/login";
import {getUserInfo} from "@/api/system/user";
import useUserStore from "@/store/user";

const route = useRoute();
const router = useRouter();
const $process = inject<ProcessInterface>("$process")!;
const userStore = useUserStore();

const loginFormRef = ref<FormInstance>();
const registerFormRef = ref<FormInstance>();

const showRegister = ref(false);
const loading = ref(false);

const loginForm = ref({
  username: "",
  password: "",
  captchaVerification: "",
  mobile: "",
  mobileCode: "",
  rememberMe: false,
});
const redirect = ref<string>();

onMounted(() => {
  redirect.value = route.query.redirect ? decodeURIComponent(<string>route.query.redirect) : undefined;
  getCookie();
})

const getCookie = () => {
  const username = getUsername();
  const password = getPassword();
  const rememberMe = getRememberMe();
  loginForm.value.username = username ? username : loginForm.value.username;
  loginForm.value.password = password ? password : loginForm.value.password;
  loginForm.value.rememberMe = rememberMe ? rememberMe : false;

}

const loginRules = {
  username: [
      {required: true, trigger: "blur", message: "用户名不能为空"}
  ],
  password: [
      {required: true, trigger: "blur", message: "密码不能为空"}
  ]
};

const validatorPhone = (rule: any, value: any, callBack: any) => {
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的手机号码格式"));
  }
};

const showLoginForm = () => {
  resetForm(loginFormRef.value);
  showRegister.value = false;
};

const showRegisterForm = () => {
  resetForm(registerFormRef.value);
  showRegister.value = true;
};

const register = () => {
  // 处理注册逻辑
};

const handleLogin = async (formEl: FormInstance | undefined) => {
  // 处理登录逻辑
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      // 设置 Cookie
      if (loginForm.value.rememberMe) {
        setUsername(loginForm.value.username)
        setPassword(loginForm.value.password)
        setRememberMe(loginForm.value.rememberMe)
      } else {
        removeUsername()
        removePassword()
        removeRememberMe()
      }
      try {
         login({
          mobile: loginForm.value.username,
          password: loginForm.value.password
        }).then(res => {
          afterLoginSuccess(res);
        });
      } finally {
        loading.value = false;
      }
    } else {
      $process.tipShow.error("请输入正确的用户名和密码");
    }
  })
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields();
}

const afterLoginSuccess = (res: LoginResp) => {
  setToken(res.data);
  getUserInfo().then(({data}) => {
    userStore.initUserInfo(data);
  });
  $process.tipShow.success("登录成功");
  router.push({
    path: redirect.value || "/"
  }).catch(() => {
    $process.tipShow.error("重定向失败");
  });
}

</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient( 90deg, rgba(247, 149, 51, 0.1) 0, rgba(243, 112, 85, 0.1) 15%, rgba(239, 78, 123, 0.1) 30%, rgba(161, 102, 171, 0.1) 44%, rgba(80, 115, 184, 0.1) 58%, rgba(16, 152, 173, 0.1) 72%, rgba(7, 179, 155, 0.1) 86%, rgba(109, 186, 130, 0.1) 100% );

  .moveRight {
    transform: translateX(100%);
  }

  .moveLeft {
    transform: translateX(-100%);
  }


  .login-card {
    width: 700px;
    height: 460px;
    display: flex;
    justify-content: space-around;
    position: relative;

    .form-box {
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
      background-color: #ffffff;
      transition: 0.5s ease-in-out;

      h1 {
        text-align: center;
        margin-bottom: 25px;
        letter-spacing: 5px;
      }

      .register-box, .login-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 8px;

        .login-form {
          width: 70%;

          :deep(.el-input__wrapper) {
            border-radius: 8px;
          }
        }

        button {
          width: 70%;
        }
      }

    }

    .con-box {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 2;

      h2 {
        margin-bottom: 10px;
      }

      button {
        padding: 8px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    .overlay {
      width: 50%;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 8px;
      z-index: 1;
      background-color: #49b1f5;
      opacity: 0.7;
      transition: 0.5s ease-in-out;
    }
  }
}
</style>
