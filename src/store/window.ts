import { defineStore } from "pinia";
import {ref} from "vue";

const useWindowStore = defineStore("$window", () => {
    const width = ref<number>(0);

    const height = ref<number>(0);

    const scrollTop = ref<number>(0);

    const initSize = () => {
        width.value = document.documentElement.clientWidth;
        height.value = document.documentElement.clientHeight;
    }

    const initDistance = () => {
        scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop;
    }

    return {
        width,
        height,
        scrollTop,

        initSize,
        initDistance,
    }
})

export default useWindowStore;