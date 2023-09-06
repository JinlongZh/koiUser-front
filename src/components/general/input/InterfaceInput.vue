<template>
  <div class="input-group">
    <div class="header">
      <span v-if="isRequired" class="required-star">*</span>
      <label class="title-600" :for="name">{{ name }}</label>
      <div class="input-description text">{{ describe }}</div>
    </div>
    <input :type="inputType" :id="name" :name="name" :required="isRequired" v-model="inputValue" @input="handleInput" />
    <div v-if="isRequired && isInvalid" class="error-message text">字段未输入</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch } from 'vue';

const emit = defineEmits(['input']);

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  describe: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  isRequired: {
    type: Boolean,
    default: false
  }
});

const inputValue = ref('');
const isInvalid = ref(false);

const inputType = computed(() => {
  if (props.type === 'int' || props.type === 'Integer') {
    return 'number';
  } else if (props.type === 'float' || props.type === 'Float' || props.type === 'double' || props.type === 'Double') {
    return 'number';
  } else if (props.type === 'boolean' || props.type === 'Boolean') {
    return 'number';
  } else {
    return 'text';
  }
});

const handleInput = () => {
  validateInput();
  emit('input', { name: props.name, value: inputValue.value });
};

const validateInput = () => {
  if (props.isRequired) {
    isInvalid.value = !inputValue.value;
  }
};

watch(inputValue, () => {
  validateInput();
});

const validate = () => {
  validateInput();
  return !isInvalid.value;
};
</script>

<style scoped lang="scss">
.input-group {
  margin-bottom: 10px;

  .header {
    display: flex;
    align-items: center;

    .required-star {
      color: red;
      margin-right: 3px;
    }

    label {
      margin-right: 5px;
      font-weight: 600;
    }
  }

  .input-description {
    color: #999;
    font-size: 14px;
    margin-top: 5px;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
  }

  .error-message {
    color: red;
    margin-top: 5px;
    font-size: 14px;
  }
}
</style>