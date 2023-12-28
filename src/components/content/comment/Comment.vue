<template>
  <div class="comment-container">
    <div class="comment-title">
      <svg-icon icon-class="comment" class="icon"/>
      <span>评论</span>
    </div>
    <CommentInput/>
    <!--评论内容区-->
    <div class="comment-area" v-if="commentCount > 0">
      <div class="comment-title">{{ commentCount }} 评论</div>
      <!-- 评论列表 -->
      <div
          class="comment-item"
          v-for="(item, index) of commentList"
          :key="item.id"
      >
        <!--头像-->
        <img class="comment-avatar" :src="item.avatar" alt=""/>
        <!--右侧-->
        <div class="comment-meta">
          <!-- 用户信息 -->
          <div class="comment-user">
            <span>{{ item.nickname }}</span>
            <span class="blogger-tag" v-if="item.userId == 2">博主</span>
          </div>
          <!-- 评论信息 -->
          <div class="comment-info">
            <!-- 楼层 -->
            <span style="margin-right:10px">{{ commentCount - index }}楼</span>
            <!-- 发表时间 -->
            <span style="margin-right:10px">{{ item.createTime }}</span>
            <!-- 回复 -->
            <span class="reply-btn" @click="replyComment(index, item)">
              回复
            </span>
          </div>
          <!-- 评论内容 -->
          <p v-html="item.commentContent" class="comment-content"></p>

          <!-- 回复人 -->
          <div
              class="reply-item"
              v-for="reply of item.replyList"
              :key="reply.id"
          >
            <!-- 头像 -->
            <img class="comment-avatar" :src="reply.avatar" alt=""/>
            <div class="reply-meta">
              <!-- 用户信息 -->
              <div class="comment-user">
                <span>{{ item.nickname }}</span>
                <span class="blogger-tag" v-if="item.userId == 2">博主</span>
              </div>
              <!-- 回复信息 -->
              <div class="comment-info">
                <!-- 发表时间 -->
                <span style="margin-right:10px">
                  {{ reply.createTime }}
                </span>
                <!-- 回复 -->
                <span class="reply-btn" @click="replyComment(index, reply)">
                  回复
                </span>
              </div>
              <!-- 回复内容 -->
              <p class="comment-content">
                <!-- 回复用户名 -->
                <template v-if="reply.replyUserId != null && reply.replyUserId !== item.userId">
                  <span>@{{ reply.replyNickname }}，</span>
                </template>
                <span v-html="reply.commentContent"/>
              </p>
            </div>
          </div>
          <!-- 回复数量 -->
          <div
              style="font-size:0.75rem;color:#6d757a"
              v-show="item.replyCount > 3"
              ref="check"
          >
            共
            <b>{{ item.replyCount }}</b>
            条回复，
            <span
                style="color:#00a1d6; cursor:pointer"
                @click="checkReplies(index, item)"
            >
              点击查看
            </span>
          </div>
          <!-- 回复分页 -->
          <div
              class="mb-3"
              style="font-size:0.75rem;color:#222;display:none"
              ref="paging"
          >
            <span style="padding-right:10px">
              共{{ Math.ceil(item.replyCount / 5) }}页
            </span>
            <paging
                ref="page"
                :totalPage="Math.ceil(item.replyCount / 5)"
                :index="index"
                :commentId="item.id"
                @changeReplyCurrent="changeReplyCurrent"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import SvgIcon from "@/components/general/icon/SvgIcon.vue";
import CommentInput from "@/components/content/comment/components/CommentInput.vue";
import {onMounted, provide, ref} from "vue";
import api from "@/api";
import type {CommentItemInterface} from "@/d.ts/api/blog/comment";
import Paging from "@/components/general/page/Paging.vue";

const props = defineProps(["commentType", "topicId"]);

provide("commentType", props.commentType);
provide("topicId", props.topicId);

let commentList = ref<Array<CommentItemInterface>>([]);
let commentCount = ref(0);
const check = ref();
const paging = ref();

const listComment = async () => {
  await api.listComment({
    pageNo: 1,
    pageSize: 10,
    commentType: props.commentType,
    topicId: props.topicId
  }).then(({data}) => {
    commentList.value = data.list;
    commentCount.value = data.total;
  })
}

const replyComment = (index: number, item: CommentItemInterface) => {
  console.log(index)
  console.log(item.id)
}

const checkReplies = (index: number, item: CommentItemInterface) => {
  api.pageCommentReply({
    pageNo: 1,
    PageSize: 5,
    commentId: item.id
  }).then(({data}) => {
    check.value[index].style.display = "none";
    item.replyList = data;
    //超过1页才显示分页
    if (Math.ceil(item.replyCount / 5) > 1) {
      paging.value[index].style.display = "flex";
    }
  })
}

const changeReplyCurrent = (current: number, index: number, commentId: number) => {
  api.pageCommentReply({
    pageNo: current,
    PageSize: 5,
    commentId: commentId
  }).then(({data}) => {
    commentList.value[index].replyList = data;
  })
}

onMounted(() => {
  listComment();
})

</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.comment-container {
  width: 100%;
  display: flex;
  flex-direction: column;

  .comment-title {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 40px;
    margin-bottom: 10px;

    .icon {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 8px;
    }
  }

  .comment-area {
    .comment-item {
      display: flex;

      .comment-avatar {
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        border-radius: 50%;
      }

      .comment-meta {
        width: 100%;
        margin-left: 0.7rem;
        border-bottom: 1px dashed #f5f5f5;

        .comment-user {
          font-size: 14px;
          line-height: 1.75;

          .comment-nickname {
            text-decoration: none;
            color: #1abc9c !important;
            font-weight: 500;
          }

          .blogger-tag {
            background: #ffa51e;
            font-size: 12px;
            display: inline-block;
            border-radius: 2px;
            color: #fff;
            padding: 0 5px;
            margin-left: 6px;
          }
        }

        .comment-info {
          line-height: 1.75;
          font-size: 0.75rem;
          color: #b3b3b3;

          .reply-btn {
            cursor: pointer;
            float: right;
            color: #ef2f11;
          }
        }

        .comment-content {
          font-size: 0.875rem;
          line-height: 1.75;
          padding-bottom: 0.625rem;
          margin-bottom: 1.25rem
        }

        .reply-item {
          display: flex;

          .reply-meta {
            margin-left: 0.8rem;
            width: 100%;
          }
        }
      }
    }
  }
}

</style>