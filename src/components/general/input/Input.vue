<template>
  <div class="input-wrapper">
    <label class="input-label" v-if="label">{{ label }}</label>
    <input
        class="input"
        v-bind="$attrs"
        :type="type || 'text'"
        :placeholder="placeholder"
        v-model="value"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';

const props = defineProps({
  type: String,
  label: String,
  placeholder: String,
  modelValue: String
})

const value = ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, (newValue) => {
  value.value = newValue
})

watch(() => value.value, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style scoped>
.input-wrapper {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;

  .input-label {
    margin-right: 8px;

  }

  .input {
    padding: 10px;
    border: 1px solid #777;
    border-radius: 4px;
  }
}


</style>