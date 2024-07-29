import {defineStore} from "pinia";


const useWebsiteStore = defineStore("$website", {
    state: () => ({
        websiteName: "",
        websiteAuthor: "",
        websiteIntro: "",
        websiteAvatar: "",
        websiteCreateTime: "",
        websiteRecordNo: "",
        aboutMe: "",
        notice: "",
        qq: "",
        github: "",
        gitee: "",
        websiteAddress: "",
    }),
})

export default useWebsiteStore;