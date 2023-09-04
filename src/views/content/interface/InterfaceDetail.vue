<template>
<div>
  dsfasdfdsaf
</div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getInterfaceInfo} from "@/api/interfacer/interfaceInfo";
import {useRouter} from "vue-router";

const router = useRouter();

let interfaceInfoId = ref(router.currentRoute.value.params.id);
const initInterfaceInfo = async () => {
 await getInterfaceInfo(interfaceInfoId.value).then(result => {
   console.log(result)
 })
}

onMounted(() => {
  console.log(134)
  initInterfaceInfo();
})

</script>

<style scoped lang="scss">

</style>