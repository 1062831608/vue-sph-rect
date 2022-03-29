import {apiGetTradeData, apiGetOrderList} from "@/api";

const state = {
    tradeData:{},
    orderList: {}// 交易订单数据
}
const actions = {
    // 获取订单交易页面的数据
    async getTradeData({commit}) {
        let res = await apiGetTradeData()
        if (res.code === 200) {
            commit('GETTRADEDATA',res.data)
        }
    },
    // 获取订单列表
    async getOrderList({commit},pageObj) {
        let res = await apiGetOrderList(pageObj.page, pageObj.limit)
        if(res.code === 200) {
            commit('GETORDERLIST', res.data)
        }
    }
}
const mutations = {
    // 将获得的订单交易页面数据存储在sate中
    GETTRADEDATA(state, val) {
        state.tradeData = val
    },
    // 将获取到的订单列表存储在state中
    GETORDERLIST(state,val) {
        state.orderList = val
    }
}
const getters = {
    // 订单信息
    detailArrayList(state) {
        return state.tradeData.detailArrayList || []
    },
    // 订单列表信息
    records(state) {
        return state.orderList.records || []
    }
}

export default  {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
