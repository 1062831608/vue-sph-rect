import {apiGetCode,apiRegister,apiLogin,apiLoginOut,apiGetUserInfo} from "@/api";

export const user = {
    namespaced: true,
    state:{
        token: localStorage.getItem('token'),
        userInfo:{}
    },
    actions:{
        // 获取验证码
        async actionsGetCode({commit},val) {
            let res = await apiGetCode(val)
            if (res.code === 200) {
                return res.data
            }else {
                return Promise.reject('fail')
            }
        },
        // 提交用户表单信息注册
        async registerUserInfo({commit}, val) {
            let res = await apiRegister(val)
            if(res.code === 223) {
                return Promise.reject('手机号已经被注册了')
            }else if (res.code ===200) {
                return 'ok'
            }else {
                return Promise.reject('注册失败')
            }
        },
        // 提交表单登录
        async loginUserInfo({commit}, val) {
            let res = await apiLogin(val)
            if(res.code === 200) {
                commit('LOGINUSERINFO', res.data)
                return 'ok'
            }else {
                return Promise.reject(Error(res.message))
            }
        },
        // 退出登录
        async loginOut({commit}) {
            let res = await apiLoginOut()
            if (res.code === 200) {
                commit('LOGINOUT')
                return res.data
            }else {
                return Promise.reject(new Error(res.message))
            }
        },
        // 获取用户的登录信息
        async getUserInfo({ commit }) {
            let res = await apiGetUserInfo()
            if (res.code === 200) {
                commit('GETUSERINFO', res.data)
                return 'ok'
            }else {
                return Promise.reject(new Error('fail'))
            }
        }

    },
    getters:{},
    mutations:{
        // 存储用户返回来的数据
        GETUSERINFO(state,res) {
            state.userInfo = res
        },
        // 将服务器返回的token存储在本地
        LOGINUSERINFO(state, res) {
            localStorage.setItem('token', res.token)
        },
        // 退出登录清除数据
        LOGINOUT(state) {
            state.userInfo = {}
            state.token = ''
            localStorage.removeItem('token')
        }
    }
}
