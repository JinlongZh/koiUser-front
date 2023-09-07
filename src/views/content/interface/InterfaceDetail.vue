<template>
  <div class="interface-detail container">
    <div class="header">
      <h2>{{ interfaceInfo.name }}</h2>
      <p>{{ interfaceInfo.description }}</p>
    </div>

    <ul class="data-container card">
      <li>
        <label>请求地址:</label>
        <span>{{ interfaceInfo.url }}</span>
      </li>
      <li>
        <label>请求头:</label>
        <span>{{ interfaceInfo.requestHeader }}</span>
      </li>
      <li>
        <label>响应头:</label>
        <span>{{ interfaceInfo.responseHeader }}</span>
      </li>
      <li>
        <label>请求方法:</label>
        <span>{{ interfaceInfo.method }}</span>
      </li>
      <li>
        <label>创建时间:</label>
        <span>{{ interfaceInfo.createTime }}</span>
      </li>
      <li>
        <label>更新时间:</label>
        <span>{{ interfaceInfo.updateTime }}</span>
      </li>
      <li>
        <label>状态:</label>
        <div class="status-dot"
             :class="{'status-open': interfaceInfo.status === 1, 'status-closed': interfaceInfo.status === 0}">
          <span class="dot"></span>
          <span class="status-text">{{ interfaceInfo.status === 1 ? '开放' : '关闭' }}</span>
        </div>
      </li>
    </ul>

    <!--请求参数表格-->
    <div class="table-requestParam" v-if="interfaceInfo.requestParamList && interfaceInfo.requestParamList.length > 0">
      <div class="k-title k-title-icon">
        请求参数
      </div>
      <HorizontalTable
          :columnHeaders="RequestTableHeaders"
          :tableData="interfaceInfo.requestParamList"
      />
    </div>

    <!--响应参数表格-->
    <div class="table-responseParam"
         v-if="interfaceInfo.responseParamList && interfaceInfo.responseParamList.length > 0">
      <div class="k-title k-title-icon">
        响应参数
      </div>
      <HorizontalTable
          :columnHeaders="ResponseTableHeaders"
          :tableData="interfaceInfo.responseParamList"
      />
    </div>

    <div v-if="interfaceInfo.requestParamList && interfaceInfo.requestParamList.length > 0"
         class="requestForm card"
    >
      <InterfaceInput
          v-for="(param, index) in interfaceInfo.requestParamList"
          :key="index"
          :name="param.name"
          :describe="param.describe"
          :type="param.type"
          :isRequired="param.required === 1"
          @input="handleInput"
      />
      <div class="button-list">
        <button class="button-reset k-btn k-btn-default" @click="resetForm">
          <span>清空</span>
        </button>
        <button class="button-sub k-btn k-btn-danger" @click="submitForm">
          <span>发起调用</span>
        </button>
      </div>
    </div>

    <div class="response-content">
      <div class="k-title k-title-icon">
        响应数据
      </div>
      <ResultDisplay :result="responseData" />
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {getInterfaceInfo, invokeInterfaceInfo} from "@/api/interfacer/interfaceInfo";
import {useRouter} from "vue-router";
import type {InterfaceInfo} from "@/d.ts/api/interfacer/interfaceInfo";
import HorizontalTable from "@/components/general/table/HorizontalTable.vue";
import InterfaceInput from "@/components/general/input/InterfaceInput.vue";
import ResultDisplay from "@/components/general/display/ResultDisplay.vue";

const responseData = ref();

const router = useRouter();

const RequestTableHeaders = ["参数名称", "是否必须", "参数类型", "参数描述"];
const ResponseTableHeaders = ["参数名称", "参数类型", "参数描述"];


let interfaceInfoId = ref(router.currentRoute.value.params.id);
const interfaceInfo = ref<InterfaceInfo>({});
const initInterfaceInfo = async () => {
  await getInterfaceInfo(interfaceInfoId.value).then(result => {
    interfaceInfo.value = result.data;
  })
}

onMounted(() => {
  initInterfaceInfo();
})

// 收集请求参数
const formValues = ref({});

const handleInput = ({name, value}) => {
  formValues.value[name] = value;
};

// 清空请求参数
const resetForm = () => {
  console.log("我不会做，请手动清空");
};
const submitForm = () => {
  const isValid = validateForm();

  if (isValid) {
    const requestParams = Object.entries(formValues.value)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    // 发起调用
    invokeInterfaceInfo(interfaceInfoId.value, requestParams).then(result => {
      responseData.value = result.data;
    })

  }
};

const validateForm = () => {
  let isValid = true;

  // 根据传入的
  for (const param of interfaceInfo.value.requestParamList) {
    if (param.required === 1) {
      const value = formValues.value[param.name];
      if (!value) {
        isValid = false;
      }
    }
  }

  return isValid;
};

</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.interface-detail {
  width: 100%;
  min-height: 100vh;
  padding: 0 80px 38px 80px;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .data-container {
    padding: 20px 38px;

    li {
      margin-bottom: 10px;
      display: flex;

      label {
        font-size: 16px;
        line-height: 21px;
        font-weight: 600;
      }

      span {
        margin-left: 10px;
        color: $normal;
        font-size: 14px;
        line-height: 20px;
      }

      .status-dot {
        display: flex;
        align-items: center;

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        &.status-open {
          .dot {
            background-color: green;
          }

          .status-text {
            color: green;
          }
        }

        &.status-closed {
          .dot {
            background-color: red;
          }

          .status-text {
            color: red;
          }
        }
      }
    }
  }

  .table-requestParam {
    width: 500px;
    margin-bottom: 28px;
  }

  .table-responseParam {
    width: 375px;
  }

  // 请求参数输入框
  .requestForm {
    width: 500px;
    display: flex;
    flex-direction: column;
    padding: 38px;
    margin-top: 28px;

    .button-list {
      margin-top: 18px;
      display: flex;
      justify-content: space-between;

      .button-reset {
        width: 60px;
        height: 32px;
      }

      .button-sub {
        width: 88px;
        height: 32px;
      }
    }
  }

  .response-content {
    margin-top: 38px;
  }


}
</style>