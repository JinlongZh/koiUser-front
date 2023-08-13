import axios from "axios";
import errorCode from "@/utils/errorCode";

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: '/app-api/', // 此处的 /admin-api/ 地址，原因是后端的基础路径为 /admin-api/
    // 超时
    timeout: 30000,
    // 禁用 Cookie 等信息
    withCredentials: false,
})

// 请求拦截器
service.interceptors.request.use((config) => {
    return config;
})

// 响应拦截器
service.interceptors.response.use(async (res) => {
    // 未设置状态码则默认成功状态
    const code: number = res.data.code || 200;
    // 获取错误信息
    const msg: string = res.data.msg || errorCode[code] || errorCode['default']
    if (code === 500) {
        ElMessage({
            message: msg,
            type: 'error'
        })
        return Promise.reject(new Error(msg))
    } else if (code === 501) {
        ElMessage({
            type: 'error',
            duration: 0,
            message: msg
        })
        return Promise.reject(new Error(msg))
    } else if (code !== 200) {
        if (msg === '无效的刷新令牌') { // hard coding：忽略这个提示，直接登出
            console.log(msg)
        } else {
            ElNotification({
                type: 'error',
                title: msg
            })
        }
        return Promise.reject('error')
    } else {
        return res.data
    }
}, (error: any) => {
    console.log('err' + error)
    let { message }: { message: string } = error;
    if (message === "Network Error") {
        message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
        message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage({
        message: message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
})

export default service;