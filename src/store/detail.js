import {getListDetail} from "@/api";

export const detail = {
    namespaced: true,
    state:{
        listDetailData:{}
    },
    actions:{
        // 发送请求获取并传送params里面的 val
        async getListDetailData({commit},val='') {
            let res = await getListDetail(val)
            if(res.code !== 200) {
                alert('获取数据失败')
            }else {
                commit('GETLISTDETAIL',res.data)
            }
        }
    }
    ,
    mutations:{
        GETLISTDETAIL(state,res) {
            state.listDetailData = res
        }
    },
    getters:{
        // 商品详情分类路径信息
        categoryView(state) {
            return state.listDetailData.categoryView || {}
        },
        // 商品属性选择栏信息
        spuSaleAttrList(state) {
            return state.listDetailData.spuSaleAttrList || []
        },
        // 商品详情信息
        skuInfo(state) {
            return state.listDetailData.skuInfo || {}
        },

    }
}
