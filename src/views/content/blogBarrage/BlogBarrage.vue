<template>
  <div>
    <!-- banner -->
    <div class="message-banner" :style="cover">
      <!-- 弹幕输入框 -->
      <div class="message-container">
        <h1 class="message-title">留言板</h1>
        <div class="message-input-wrapper">
          <input
              v-model="messageContent"
              @click="show = true"
              @keyup.enter="submitMessage"
              placeholder="说点什么吧"
          />
          <button
              class="ml-3 animated bounceInLeft"
              @click="submitMessage"
              v-show="show"
          >
            发送
          </button>
        </div>
      </div>
      <!-- 弹幕列表 -->
      <div class="barrage-container">
        <vue-danmaku ref="danmakuRef" v-model:danmus="barrageList" :speeds="200" useSlot loop
                     :channels="0" style="height: calc(100% - 60px);width: 100%; position: absolute; top: 60px;">
          <template v-slot:dm="{ index, danmu }">
            <span class="barrage-items" style="
                                          background: rgb(0, 0, 0, 0.5);
                                          border-radius: 100px;
                                          color: #fff;
                                          font-size: 16px;
                                          padding: 5px 10px 5px 5px;
                                          align-items: center;
                                          display: flex;"
            >
              <img
                  :src="danmu.avatar"
                  width="30"
                  height="30"
                  style="border-radius:50%;"
              />
              <span class="ml-2">{{ danmu.nickname }} : </span>
              <span class="ml-2">{{ danmu.messageContent }}</span>
            </span>
          </template>
        </vue-danmaku>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, inject} from 'vue';
import {ProcessInterface} from "@/d.ts/modules/process";
import useUserStore from "@/store/user";
import {Message} from "@/d.ts/api/blog/blogBarrage";
import {addMessage, queryMessage} from "@/api/blog/blogBarrage";
import vueDanmaku from 'vue3-danmaku';

const danmakuRef = ref();

const userStore = useUserStore();
const $process = inject<ProcessInterface>("$process")!;

const show = ref(false);
const messageContent = ref('');
const barrageList = ref<Message[]>([]);


onMounted(() => {
  listMessage();
});

const submitMessage = () => {
  if (messageContent.value.trim() === '') {
    $process.tipShow.error('留言不能为空');
    return;
  }

  const userAvatar = userStore.isLoggedIn
      ? userStore.userInfo.avatar
      : "https://static.eiensakura.icu/config/680f781354252b211c8ac54b5ef55cea.png";
  const userNickname = userStore.isLoggedIn
      ? userStore.userInfo.nickname
      : '游客';

  const message: Message = {
    avatar: userAvatar,
    nickname: userNickname,
    messageContent: messageContent.value,
    time: Math.floor(Math.random() * (10 - 7)) + 7
  }
  addMessage(message).then(({data}) => {
    $process.tipShow.success('留言成功');
  })
  messageContent.value = '';
  show.value = false;
  danmakuRef.value.push(message);
};

const listMessage = () => {
  queryMessage().then(({data}) => {
    barrageList.value = data;
  })
};

const cover = computed(() => {
  const cover = 'https://static.eiensakura.icu/config/aacab4c60cfc5d81cdcfaf724560f5d8.jpg';
  return "background: url(" + cover + ") center center / cover no-repeat";
});
</script>

<style scoped>

.message-banner {
  top: -60px;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: #49b1f5;
  animation: header-effect 1s;


  .message-container {
    position: absolute;
    width: 360px;
    top: 35%;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 5;
    margin: 0 auto;
    color: #fff;

    .message-title {
      color: #eee;
      animation: title-scale 1s;
    }

    .message-input-wrapper {
      display: flex;
      justify-content: center;
      height: 2.5rem;
      margin-top: 2rem;

      input {
        outline: none;
        width: 70%;
        border-radius: 20px;
        height: 100%;
        padding: 0 1.25rem;
        color: #eee;
        border: #fff 1px solid;
        background: rgba(0, 0, 0, 0);
      }

      input::-webkit-input-placeholder {
        color: #eeee;
      }

      button {
        outline: none;
        border-radius: 20px;
        height: 100%;
        width: 72px;
        margin-left: 20px;
        padding: 0 1.25rem;
        border: #fff 1px solid;
        background: rgba(0, 0, 0, 0);
      }
    }


  }

  .barrage-container {
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;


    .barrage-items {
      background: rgb(0, 0, 0, 0.7);
      border-radius: 100px;
      color: #fff;
      padding: 5px 10px 5px 5px;
      align-items: center;
      display: flex;
    }
  }
}


</style>
