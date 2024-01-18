<template>
  <div class="container">
    <div class="login-card card t-shadow">
      <div class="form-box" :class="{ moveRight: showRegister }">
        <!-- 注册 -->
        <div class="register-box" v-show="showRegister">
          <h1>注册</h1>
          <input type="text" placeholder="用户名">
          <input type="password" placeholder="密码">
          <input type="password" placeholder="确认密码">
          <button class="k-btn k-btn-primary" @click="register">注册</button>
        </div>
        <!-- 登录 -->
        <div class="login-box" v-show="!showRegister">
          <h1>登录</h1>
          <input type="text" placeholder="用户名">
          <input type="password" placeholder="密码">
          <button class="k-btn k-btn-primary" @click="login">登录</button>
        </div>
      </div>
      <div class="overlay" :class="{ moveLeft: showRegister }" />
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
import {ref} from 'vue';

const showRegister = ref(false);

const showLoginForm = () => {
  showRegister.value = false;
};

const showRegisterForm = () => {
  showRegister.value = true;
};

const register = () => {
  // 处理注册逻辑
};

const login = () => {
  // 处理登录逻辑
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  //background-color: #00b2ff;

  .moveRight {
    transform: translateX(100%);
  }
  .moveLeft {
    transform: translateX(-100%);
  }


  .login-card {
    width: 800px;
    height: 600px;
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

        input {
          border: 1px solid rgba(0, 0, 0, 0.2);
          background: transparent;
          width: 70%;
          margin-bottom: 16px;
          padding: 8px;
          text-indent: 8px;
          border-radius: 8px;
          box-sizing: border-box;

          &:focus {
            border: 1px solid #007bff;
            transition: 0.5s;
          }
        }

        button {
          width: 70%;
          margin-top: 30px;
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
      transition: 0.5s ease-in-out;
    }
  }
}
</style>
