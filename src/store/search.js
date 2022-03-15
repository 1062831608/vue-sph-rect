import {getSearchList} from "@/api"; // 引入获取搜索数据的api

// search模块
export const search = {
    namespaced:true,
    state:{
        searchData:{} // 搜索页面的数据
    },
    actions:{
        async getSearchData({commit},val={}) {
            let res =  await getSearchList(val)
            if (res.code === 200) {
                commit('GETSEARCHDATA', res.data)
            }else{
                alert('获取数据失败')
            }
        }

    },
    mutations:{
        GETSEARCHDATA(state,val) {
            state.searchData = val
        }
    },
    getters:{
        // 商品属性
        attrsList(state) {
            return state.searchData.attrsList || []
        },
        // 检索出来的商品列表
        goodsList(state) {
            return state.searchData.goodsList || []
        },
        // 面包屑数据
        trademarkList(state) {
            return state.searchData.trademarkList || []
        }
    }
}
