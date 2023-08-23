<template>
  <div class="container">
    <div class="content">
      <!-- 配图 -->
      <div class="pic" :style="{backgroundImage: 'url(' + resource.ssoPic + ')' }"></div>
      <div class="right">
        <span class="title">三方授权</span>

        <el-divider/>

        <div class="approve-content">
          <el-form ref="loginForm" :model="scopeForm" class="approve-form">
            <!-- 授权范围的选择 -->
            <span class="text">此第三方应用请求获得以下权限：</span>
            <el-form-item prop="scopes">
              <el-checkbox-group class="checkbox_content" v-model="scopeForm.scopes">
                <el-checkbox v-for="scope in params.scopes" :label="scope" :key="scope"
                             style="display: block; margin-bottom: -10px;">{{ formatScope(scope) }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 下方的登录按钮 -->
            <el-form-item style="width:100%;">
              <el-button :loading="loading" size="medium" type="primary" style="width:60%;"
                         @click.native.prevent="handleAuthorize(true)">
                <span v-if="!loading">同意授权</span>
                <span v-else>授 权 中...</span>
              </el-button>
              <el-button size="medium" style="width:36%"
                         @click.native.prevent="handleAuthorize(false)">拒绝
              </el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>


    </div>
  </div>
  <Footer/>
</template>

<script setup lang="ts">
import Footer from "@/components/index/Footer.vue";
import resource from "@/config/resource";
import {onMounted, reactive, ref} from "vue";

const loading = ref<boolean>(false);

const scopeForm = reactive({
  // 已选中的 scope 数组
  scopes: [],
});
// URL 上的 client_id、scope 等参数
const params = reactive({
  responseType: undefined,
  clientId: undefined,
  redirectUri: undefined,
  state: undefined,
  scopes: ["user.read", "user.write"], // 优先从 query 参数获取；如果未传递，从后端获取
});

onMounted(() => {

})

const handleAuthorize = (approved: boolean) => {
  console.log(approved)
}

const formatScope = (scope: string) => {
  switch (scope) {
    case 'user.read':
      return '访问你的个人信息'
    case 'user.write':
      return '修改你的个人信息'
    default:
      return scope
  }
};

</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.container {
  width: 100%;
  height: 100%;
  background-color: $page-bg;
  background-size: cover;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;

  .content {
    width: 600px;
    height: 400px;
    padding: 20px;
    background-color: $page-bg;
    color: $black;
    border: 1px solid $gray-light;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba($color: $black, $alpha: 0.7);
    position: relative;

    .pic {
      width: 200px;
      height: 400px;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 20px 0 0 20px;
      position: absolute;
      top: 0;
      left: 0;
    }

    .right {
      width: 400px;
      height: 400px;
      padding: 20px 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 200px;

      .title {
        font-size: 20px;
        color: $title;
      }

      .approve-content {
        width: 100%;

        .approve-form {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;

          .text {
            margin: 0 0 10px 0;
          }
        }
      }
    }

  }
}


</style>