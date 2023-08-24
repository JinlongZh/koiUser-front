<template>
  <div class="container">
    <div class="content">
      <!-- 配图 -->
      <div class="pic" :style="{backgroundImage: 'url(' + resource.ssoPic + ')' }"></div>
      <div class="right">
        <span class="title">三方授权 ({{ client.name }})</span>

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
import {useRoute} from "vue-router";
import {authorize, getAuthorizeInfo} from "@/api/system/oauth2";
import {AuthorizeResp} from "@/d.ts/api/system/oauth2";

const $route = useRoute()

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
  scopes: [], // 优先从 query 参数获取；如果未传递，从后端获取
});
// 客户端信息
const client = reactive({
  name: "",
  logo: "",
})

onMounted(() => {
  // http://127.0.0.1:5173/sso?response_type=code&client_id=koiuser-sso-demo-by-code&redirect_uri=https://127.0.0.1:18080&state=1&scope=user.read%20user.write
  // http://127.0.0.1:5173/sso?response_type=code&client_id=koiuser-sso-demo-by-code&redirect_uri=https://127.0.0.1:18080
  params.responseType = $route.query.response_type
  params.clientId = $route.query.client_id
  params.redirectUri = $route.query.redirect_uri
  params.state = $route.query.state
  if ($route.query.scope) {
    params.scopes = ($route.query.scope as string).split(" ");
  }
  // 如果有 scope 参数，先执行一次自动授权，看看是否之前都授权过了。
  if (params.scopes.length > 0) {
    doAuthorize(true, params.scopes, []).then(res => {
      const href = res.data;
      if (!href) {
        console.log("自动授权未通过！");
        return;
      }
      // location.href = href;
      console.log(href)
    })
  }

  // 获取授权页的基本信息
  getAuthorizeInfo(params.clientId).then(res => {
    client.name = res.data.client.name;
    client.logo = res.data.client.logo;
    // 解析 scope
    let scopes = [];
    // 1.1 如果 params.scope 非空，则过滤下返回的 scopes
    if (params.scopes.length > 0) {
      for (const scope of res.data.scopes) {
        if (params.scopes.indexOf(scope.key) >= 0) {
          scopes.push(scope)
        }
      }
      // 1.2 如果 params.scope 为空，则使用返回的 scopes 设置它
    } else {
      scopes = res.data.scopes
      for (const scope of scopes) {
        params.scopes.push(scope.key)
      }
    }
    // 生成已选中的 checkedScopes
    for (const scope of scopes) {
      if (scope.value) {
        scopeForm.scopes.push(scope.key)
      }
    }
  })
})

const handleAuthorize = (approved: boolean) => {
  loading.value = true;
  // 计算 checkedScopes + uncheckedScopes
  let checkedScopes = [];
  let uncheckedScopes = [];
  if (approved) { // 同意授权，按照用户的选择
    checkedScopes = scopeForm.scopes;
    uncheckedScopes = params.scopes.filter(item => checkedScopes.indexOf(item) === -1);
  } else { // 拒绝，则都是取消
    checkedScopes = []
    uncheckedScopes = params.scopes
  }
  // 提交授权的请求
  doAuthorize(false, checkedScopes, uncheckedScopes).then(res => {
    const href = res.data;
    if (!href) {
      return;
    }
    // location.href = href;
    console.log(href);
  }).finally(() => {
    loading.value = false;
  })
}

const doAuthorize = (autoApprove: boolean, checkedScopes: Array<string>, uncheckedScopes: Array<string>): Promise<AuthorizeResp> => {
  return authorize(params.responseType, params.clientId, params.redirectUri, params.state,
      autoApprove, checkedScopes, uncheckedScopes)
};


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