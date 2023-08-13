<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Login</h1>
      <el-form :model="form" @submit.native.prevent="handleSubmit">
        <el-form-item label="Username">
          <el-input v-model="form.username" placeholder="Enter your username" required></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="form.password" placeholder="Enter your password" required></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';

const form = ref({
  username: '',
  password: '',
});

const handleSubmit = () => {
  const userData = {
    username: form.value.username,
    password: form.value.password,
  };

  console.log(userData);

  // 在这里执行登录逻辑
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.login-container {
  width: inherit;
  height: inherit;
  background-color: $white;
  margin: 0;
  padding: 0;
  // 定位
  display: flex;
  justify-content: center;
  align-items: center;


  .login-card {
    width: 400px;
    padding: 20px;
    background-color: $white;
    color: $black;
    border: 1px solid $gray-light;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba($color: $black, $alpha: 0.7);

    h1 {
      font-size: 24px;
      text-align: center;
      margin-bottom: 30px;
    }
  }

  .form {
    width: 100%;

    .form-item {
      margin-bottom: 20px;
    }

    .input {
      width: 100%;
    }

    .button {
      width: 100%;
    }
  }
}
</style>