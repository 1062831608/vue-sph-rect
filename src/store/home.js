// home模块
import {getCategoryList,mockGetBannerList,mockGetFloorList} from "@/api"; //引入接口
export const  home = {
    namespaced:true,
    state:{
        categoryList:[], // 三级分类列表数据
        bannerList:[], // 轮播图的数据
        floorList:[],  // 楼层的数据
    },
    actions:{
        // 发送ajax请求获取一级二级三级分类列表
        async getcatelist({commit}) {
            let res = await getCategoryList()
            if (res.code === 200) {
                commit('GETCATELIST',res.data)
            }
        },
        // 通过mock获取轮播图的数据
        async getBannerList({commit}) {
            let res = await mockGetBannerList()
            if (res.code === 200) {
                commit('GETBANNERLIST',res.data)
            }
        },
        // 通过mock获取楼层的数据
        async getFloorList({commit}) {
            let res = await mockGetFloorList()
            if (res.code === 200) {
                commit('GETFLOORLIST',res.data)
            }
        }
    },
    mutations:{
        // 将一级二级三级分类的数据保存在state中
        GETCATELIST(state, val) {
            state.categoryList = val
        },
        // 将数据轮播图的数据保存在state中
        GETBANNERLIST(state,val) {
            state.bannerList = val
        },
        GETFLOORLIST(state, val) {
            state.floorList = val
        }

    },
    getters:{}
}
