// 二次封装axios
import axios from 'axios' // 引入axios
import Nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css'  // 引入进度条样式
import store from '@/store'

const requests = axios.create({
    baseURL:'/api', // 基础路径
    timeout: 5000   // 超时时间
})

// 请求拦截器
requests.interceptors.request.use(config=>{
    Nprogress.start() //进度条刚开始
    // 在config对象中有个属性很重要，header响应头
    // 判断是否有uuid，有的话加入请求头中
    if (store.state.detail.uuid_token || store.state.shopcar.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token || store.state.shopcar.uuid_token
    }
    return config
})

// 响应拦截器
requests.interceptors.response.use(res=>{
    Nprogress.done() //进度条结束
    return res.data  // 响应成功的回调
},() =>{
    // 失败终止Promise
    return Promise.reject(new Error('fail'))
} )

// 对外暴露
export default requests
