<template>
  <div class="input-wrapper">
    <label class="input-label" v-if="label">{{ label }}</label>
    <input
        class="input"
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        v-model="value"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';

const props = withDefaults(defineProps({
  type: String,
  label: String,
  placeholder: String,
  modelValue: String
}), {
  type: 'text'
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
  flex-direction: column;
}

.input-label {
  margin-bottom: 8px;
}

.input {
  padding: 10px;
  border: 1px solid #777;
  border-radius: 4px;
}
</style>