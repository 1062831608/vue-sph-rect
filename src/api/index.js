// 接口统一管理

import requests from './request'
import mockRequests from "./mockAjax"; // 引入封装好的mock请求

//获取三级分类页
export const getCategoryList = ()=>{
    return requests({
        method:'get',
        url:'/product/getBaseCategoryList'
    })
}

// 获取轮播图的数据
export const mockGetBannerList = ()=>{
    return mockRequests.get('/banner')
}

// 获取floor的数据
export const mockGetFloorList = () =>{
    return mockRequests.get('/floor')
}

// 获取搜索的数据
export const getSearchList = (params)=>{
    return requests({
        method:'post',
        url:'list',
        data: params
    })
}

// 获取商品详细信息
export const getListDetail = (params)=>{
    return requests({
        method:'get',
        url:`item/${params}`
    })
}
