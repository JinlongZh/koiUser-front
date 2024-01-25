import {defineStore} from "pinia";


const useWebsiteStore = defineStore("$website", {
    state: () => ({
        notice: "",
    }),
})

export default useWebsiteStore;