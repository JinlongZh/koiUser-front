<template>
  <div class="input-wrapper">
    <!-- 输入框 -->
    <div
        ref="editorRef"
        class="input"
        v-text="modelValue"
        :contenteditable="!disabled"
        @input="onInput"
        @keydown="onInputKeyDown"
    >
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineOptions, defineProps, withDefaults, toRefs, defineEmits, ref, onMounted, watch, nextTick} from "vue";
import {IMention, INode, NodeType} from "@/views/content/im/components/input/type.d.ts";
import {
  getEditorRange,
  insertInputText,
  transformNodeListToMentionData
} from "@/views/content/im/components/input/util";
import {CacheUserItem} from "@/d.ts/api/system/user";

// 关闭透传 attrs 到组件根节点，传递到子节点  v-bind="$attrs"
defineOptions({inheritAttrs: false});

interface Props {
  // 是否启用 contentEditable
  disabled?: boolean;
  // v-model 的 value
  modelValue: string;
  // 艾特 成员列表数据
  mentions?: IMention[];
  // 最大长度
  maxLength?: number;
  // 劫持
  className?: string;
  style?: object;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  modelValue: '',
  mentions: () => [] as IMention[],
  maxLength: -1,
});

// v-model
const emit = defineEmits([
  'update:modelValue',
  'change',
  'focus',
  'blur',
  'callBackRefAndRange',
  'send',
])

const editorRef = ref<HTMLElement | null>();

// 记录编辑器光标的位置
const editorRange = ref<{ range: Range; selection: Selection } | null>(null)

// 是否展示选人弹窗
const showDialog = ref(false);
const personList = ref<CacheUserItem[]>([])

const {modelValue: value, maxLength, disabled} = toRefs(props);

// 禁用解除后自动获取焦点。
watch(disabled, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      editorRef.value?.focus();
    })
  }
})

onMounted(() => {
  nextTick(() => {
    editorRef.value?.focus();
  })
})

function onInput(event: Event) {
  const target = event.target as HTMLDivElement;
  let text = target.innerText;
  emit('update:modelValue', text);

  onDataChangeCallBack()
}

// 当输入框值发生变化时，解析它的数据，并回传
const onDataChangeCallBack = () => {
  if (editorRef.value) {
    const nodeList: INode[] = []
    const editorChildNodes = [].slice.call(
        editorRef.value.childNodes,
    ) as unknown as NodeListOf<ChildNode>
    if (editorChildNodes.length > 0) {
      editorChildNodes.forEach((element) => {
        // 文本
        if (element.nodeName === '#text') {
          const el = element as Text
          if (el.data && el.data.length > 0) {
            nodeList.push({
              type: NodeType.text,
              data: el.data,
            })
          }
        }
        // br换行
        if (element.nodeName === 'BR') {
          nodeList.push({
            type: NodeType.br,
            data: '\n',
          })
        }
        // button
        if (element.nodeName === 'BUTTON') {
          const el = element as HTMLButtonElement
          const personInfo = JSON.parse(el.dataset.person as string)
          nodeList.push({
            type: NodeType.at,
            data: personInfo,
          })
        }
      })
    }
    const {pureString, mentionList} = transformNodeListToMentionData(nodeList);
    // 文本末尾换行出现两个换行符处理
    if (pureString.length > 0 && pureString.charAt(pureString.length - 1) === '\n') {
      emit('change', pureString.substring(0, pureString.length - 1), mentionList);
    } else {
      emit('change', pureString, mentionList);
    }
  }
}

const onInputKeyDown = (e: KeyboardEvent) => {
  // 设置maxLength后，限制字符数输入
  if (maxLength.value && maxLength.value > 0) {
    if ((e.target as HTMLInputElement).innerText.length >= maxLength.value) {
      // 不屏蔽删除键
      // keyCode Backspace:8 Delete:46
      if (!(e.key === 'Backspace' || e.key === 'Delete')) {
        e.preventDefault();
      }
    }
  }

  if (showDialog.value && personList.value.length > 0) {
    console.log("showDialog.value && personList.value.length > 0")
  } else {
    // 禁止默认换行
    if (
        (e.ctrlKey && e.key === 'Enter') ||
        (e.shiftKey && e.key === 'Enter') ||
        (e.metaKey && e.key === 'Enter')
    ) {
      e.preventDefault();
      onWrap();
      return;
    }
    // 处理输入法状态下的回车事件
    if ((e as KeyboardEvent).isComposing) {
      return e.preventDefault();
    }
    // 禁止默认换行
    if (e.key === 'Enter') {
      e.preventDefault();
      emit('send', e);
    }
  }
}

// 插入换行符
const onWrap = () => {
  const rangeInfo = getEditorRange();
  if (!rangeInfo || !rangeInfo.range || !rangeInfo.selection) {
    return;
  }
  insertInputText({
    content: '\n',
    selection: rangeInfo.selection,
    range: rangeInfo.range,
  })
}

// 暴露 ref 属性
defineExpose({input: editorRef, range: editorRange});


</script>

<style scoped lang="scss">
.input-wrapper {
  display: inline-flex;
  width: 100%;
  height: 100%;
  max-height: 100px;
  padding: 0 12px;
  cursor: text;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);

  &:focus-within {
    outline: 1px solid var(--hover-primary);
  }

  .input {
    flex: 1;
    padding: 4px 0;
    overflow: hidden;
    overflow-y: auto;
    font-size: 14px;
    color: inherit;
    white-space: pre-wrap;
    cursor: inherit;
    resize: none;
    background: none;
    border: none;
    border-radius: 0;
    outline: none;

    &:empty::before {
      color: var(--font-placeholder);
      pointer-events: none;
      content: attr(placeholder);
    }
  }
}
</style>
