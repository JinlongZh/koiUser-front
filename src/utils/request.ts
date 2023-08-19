import axios from "axios";
import errorCode from "@/utils/errorCode";
import {ElMessage} from 'element-plus'
import {getAccessToken, getRefreshToken} from '@/utils/auth'


// 需要忽略的提示。忽略后，自动 Promise.reject('error')
const ignoreMsgList = [
    "无效的刷新令牌", // 刷新令牌被删除时，不用提示
    "刷新令牌已过期" // 使用刷新令牌，刷新获取新的访问令牌时，结果因为过期失败，此时需要忽略。否则，会导致继续 401，无法跳转到登出界面
]

// 是否显示重新登录
export let isRelogin = {show: false};

// Axios 无感知刷新令牌，https://www.dashingdog.cn/article/11 与 https://segmentfault.com/a/1190000020210980
// 请求队列
let requestList = []
// 是否正在刷新中
let isRefreshToken = false

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'


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
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getAccessToken() && getRefreshToken() && !isToken) {
        config.headers['AccessToken'] = 'Bearer ' + getAccessToken() // 让每个请求携带自定义token
    }
    return config;
}, error => {
    console.log(error)
    Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(async (res) => {
    // 未设置状态码则默认成功状态
    const code: number = res.data.code || 200;
    // 获取错误信息
    const msg: string = res.data.msg || errorCode[code] || errorCode['default']
    if (ignoreMsgList.indexOf(msg) !== -1) { // 如果是忽略的错误码，直接返回 msg 异常
        return Promise.reject(msg)
    } else if (code === 500) {
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
            ElMessage({
                type: 'error',
                message: msg
            })
        }
        return Promise.reject('error')
    } else {
        return res.data
    }
}, (error: any) => {
    console.log('err' + error)
    let {message}: { message: string } = error;
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