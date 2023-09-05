<template>
  <table>
    <thead>
    <tr>
      <th v-for="header in columnHeaders" :key="header">{{ header }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, index) in tableData" :key="index">
      <td v-for="(cell, colIndex) in row" :key="colIndex">{{ cell }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';

const props = defineProps({
  columnHeaders: {
    type: Array,
    required: true,
  },
  tableData: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss">
table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
}
</style>