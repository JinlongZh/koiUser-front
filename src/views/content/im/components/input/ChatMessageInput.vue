<template>
  <div class="input-wrapper">
    <!-- 输入框 -->
    <div
        ref="editorRef"
        class="input"
        :text="modelValue"
        :contenteditable="!disabled"
        @input="onInput"
    >
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineOptions, defineProps, withDefaults, toRefs, defineEmits, ref, onMounted, watch, nextTick} from "vue";
import {IMention, INode, NodeType} from "@/views/content/im/components/input/type.d.ts";
import {transformNodeListToMentionData} from "@/views/content/im/components/input/util";

// 关闭透传 attrs 到组件根节点，传递到子节点  v-bind="$attrs"
defineOptions({inheritAttrs: false});

interface Props {
  // 是否启用 contentEditable
  disabled?: boolean
  // v-model 的 value
  modelValue: string
  // 艾特 成员列表数据
  mentions?: IMention[]
  // 最大长度
  maxLength?: number
  // 劫持
  className?: string
  style?: object
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  modelValue: '',
  mentions: () => [],
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

const {modelValue: value, maxLength, disabled} = toRefs(props);

// 记录input文本内容
const inputStr = ref("");

// 禁用解除后自动获取焦点。
watch(disabled, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      editorRef.value?.focus()
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
  inputStr.value = text;

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


</script>

<style scoped lang="scss">
.input-wrapper {
  display: inline-flex;
  width: 100%;
  height: 100%;
  max-height: 100px;
  padding: 0 12px;
  color: var(--font-main);
  cursor: text;
  background-color: var(--background-2);
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
