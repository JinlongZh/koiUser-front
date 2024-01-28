<template>
  <div class="headerItem">
    <div class="barItem" v-for="item in headerConfig" :key="item.word">
      <div class="option" v-if="!item.children" @click="pageJump(item.path)">
        <img :src="item.icon"/>
        <div class="word">{{ item.word }}</div>
      </div>
      <div class="dropDown" v-else>
        <div class="link">
          <img :src="item.icon"/>
          <div class="word">{{ item.word }}</div>
          <svg-icon icon-class="downBold" style="margin-left: 5px;margin-top: 5px" class="icon" />
        </div>
        <div class="list card">
          <div class="child" v-for="child in item.children" :key="child.word" @click="pageJump(child.path)">
            <img :src="child.icon"/>
            <div class="word">{{ child.word }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {headerConfig} from "@/config/site";
import {useRouter} from "vue-router";

const router = useRouter();

const pageJump = (path: string) => {
  router.push(path);
}


</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";

.headerItem {
  display: flex;

  .barItem {
    margin-right: 20px;

    .option, .link, .child {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 16px;
        height: 16px;
        display: block;
      }

      .word {
        line-height: 20px;
        margin-left: 5px;
      }
    }

    .option {
      cursor: pointer;
      position: relative;
      transition: all 0.2s;

      &:after {
        position: absolute;
        bottom: -8px;
        left: 0;
        z-index: 1;
        width: 0;
        height: 2px;
        background-color: #80c8f8;
        content: "";
        transition: width 0.3s ease-in-out;
      }

      &:hover::after {
        width: 100%;
      }
      &:hover {
        color:  #80c8f8;
      }
    }

    .dropDown {
      position: relative;
      cursor: pointer;

      .list {
        position: absolute;
        top: 100%;
        left: 0;
        width: 0;
        height: 0;
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.5s;
      }

      &:hover .list {
        width: 100%;
        height: auto;
        opacity: 1;
      }

      .child {
        height: 40px;
        cursor: pointer;
        color: #333;
        &:hover {
          background-color:  #80c8f8;
        }
      }
    }
  }
}
</style>