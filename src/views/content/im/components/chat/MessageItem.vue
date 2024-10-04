<template>
  <span v-if="isShowTimeBlock && messageData.timeBlock" class="send-time-block">{{ messageData.timeBlock }}</span>
  <span v-if="isRecall" class="send-time-block">{{ message.body }}</span>
  <div ref="messageVisibleEl">
    <transition name="remove">
      <div :class="chatClass" v-if="!isRecall">
        <el-avatar
            :src="userInfo.avatar"
            @contextmenu.prevent.stop="handleUserRightClick($event)"
        />
        <div class="chat-item-box" ref="boxRef">
          <div class="chat-item-user-info">
            <!-- 用户名 -->
            <span class="user-name" @contextmenu.prevent.stop="handleUserRightClick($event)">
              {{ userInfo.nickname }}
            </span>
            <!-- 消息归属地 -->
            <span class="user-ip">({{ userInfo.localPlace || '未知' }})</span>
            <!-- 消息发送时间 -->
            <span class="send-time" v-if="isShowTime">
              {{ formatTime(message.createTime) }}
            </span>
          </div>
          <el-tooltip
              effect="light"
              popper-class="option-tooltip"
              :trigger="tooltipTrigger"
              :placement="tooltipPlacement || 'bottom-end'"
              :offset="2"
              :show-arrow="false"
              :teleported="false"
          >
            <div
                ref="renderMessageRef"
                :class="['chat-item-content', { uploading: messageData?.loading }]"
            >
              <span class="text">{{ message.body }}</span>
            </div>
            <template #content>
              <MessageOption :message="messageData"/>
            </template>
          </el-tooltip>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">

import {computed, defineOptions, defineProps, nextTick, onMounted, ref, withDefaults} from "vue";
import {MessageType} from "@/d.ts/api/chat/chat";
import {MessageEnum} from "@/config/constant";
import useUserStore from "@/store/user";
import {TooltipTriggerType} from "element-plus";
import {formatTime} from "@/utils/computedTime";
import {useUserInfo} from "@/hooks/useCache";
import MessageOption from "@/views/content/im/components/chat/MessageOption.vue";

const props = withDefaults(
    defineProps<{
      // 消息体
      messageData: MessageType,
      // 是否显示时间
      isShowTime?: boolean,
      // 是否显示时间段
      isShowTimeBlock?: boolean,
      // 消息气泡模式：左右分布-spread、左对齐-left、右对齐-right
      bubbleMode?: string,
      // 消息气泡操作触发方式
      tooltipTrigger?: TooltipTriggerType,
    }>(),
    {
      isShowTime: true,
      isShowTimeBlock: true,
      bubbleMode: 'spread',
      tooltipTrigger: () => 'hover',
    },
)

onMounted(() => {
  nextTick(() => {
    if (renderMessageRef.value && boxRef.value) {
      const renderMessageWidth = renderMessageRef.value.clientWidth;
      const boxWidth = boxRef.value.clientWidth;

      if (renderMessageWidth + 50 <= boxWidth) {
        tooltipPlacement.value = 'right-start';
      } else if (props.messageData.message.body.replyMessageId) {
        tooltipPlacement.value = 'top-end';
      } else {
        tooltipPlacement.value = 'bottom-end';
      }
    }
  })
})

const userStore = useUserStore();

// 多根元素的时候，不加这个透传属性会报 warning
defineOptions({inheritAttrs: false});

const messageVisibleEl = ref(null);
const boxRef = ref<HTMLElement | null>(null);
const renderMessageRef = ref<HTMLElement | null>(null);

const tooltipPlacement = ref();

// 只能对一级 props 进行 toRefs 结构，否则会丢失响应
const message = computed(() => props.messageData.message);
const fromUser = computed(() => props.messageData.fromUser);
// 从缓存中获取用户信息
const userInfo = useUserInfo(fromUser.value.userId);
const isRecall = computed(() => {
  const type = message.value.type;
  return type === MessageEnum.RECALL || type === MessageEnum.SYSTEM;
});
const isCurrentUser = computed(() => fromUser.value.userId === userStore?.userInfo.id);
const chatClass = computed(() => ({
  'chat-item': true,
  'is-me': isCurrentUser.value,
  'right': (isCurrentUser.value && props.bubbleMode === 'spread') || props.bubbleMode === 'right',
}))

/** 右键菜单 */
const handleUserRightClick = (e: MouseEvent) => {
  // perf: 未登录时，禁用右键菜单功能
  if (!userStore.isLoggedIn || isCurrentUser.value) {
    return;
  }
  console.log("点击了用户头像", e);
}

</script>

<style scoped lang="scss">
.send-time-block {
  display: inline-block;
  width: 100%;
  margin-bottom: 12px;
  font-size: 12px;
  color: var(--font-light);
  text-align: center;
  user-select: none;
}

.chat-item {
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 20px;

  &:hover {
    .chat-item-box {
      .chat-item-user-info {
        .send-time {
          opacity: 1;
        }
      }
    }
  }

  .chat-item-box {
    padding: 0 52px 0 12px;

    .chat-item-user-info {
      display: flex;
      column-gap: 4px;
      align-items: center;
      margin-bottom: 8px;
      font-size: 12px;
      color: var(--font-light);
      white-space: nowrap;

      .user-name:hover {
        color: var(--color-primary);
        cursor: pointer;
      }

      .user-ip {
        user-select: none;
      }

      .send-time {
        display: inline-block;
        user-select: none;
        opacity: 0;
      }
    }

    .chat-item-content {
      position: relative;
      width: fit-content;

      .text {
        min-height: 1em;
        padding: 8px 12px;
        font-size: 15px;
        line-height: 22px;
        color: var(--font-base);
        word-break: break-word;
        background-color: var(--color-white);
        border-radius: 2px 18px 18px;
      }
    }

  }
}


.right {
  flex-direction: row-reverse;

  .chat-item-user-info {
    justify-content: flex-end;

    .send-time {
      order: 0;
    }

    .user-badge {
      order: 1;
    }

    .user-name {
      order: 2;
    }

    .user-ip {
      order: 3;
    }
  }

  .chat-item-content {
    margin-left: auto;

    .text {
      border-radius: 18px 2px 18px 18px;
    }
  }

  .extra,
  .chat-item-reply {
    margin-right: 0;
    margin-left: auto;
  }
}

.is-me {
  .chat-item-box {
    padding-right: 12px;
    padding-left: 52px;

    .chat-item-content {
      display: flex;
      align-items: center;

      .icon-loading {
        margin: 0 8px;
      }

      .text {
        background-color: var(--color-primary);
        color: var(--font-main);

        &-mention {
          color: #f1f1f1;
        }
      }
    }
  }
}

</style>