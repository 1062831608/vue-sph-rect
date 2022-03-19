// 接口统一管理

import requests from './request'
import mockRequests from "./mockAjax"; // 引入封装好的mock请求

//获取三级分类页
export const getCategoryList = ()=>{
    return requests({
        method:'GET',
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
        method:'POST',
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

// 商品添加至购物车
export const addOrUpdateShopCar = (skuId,skuNum)=>{
    return requests({
        method:'POST',
        url:`cart/addToCart/${ skuId }/${ skuNum }`
    })
}

// 获取购物车商品列表
export const getShopcarList = ()=>{
    return requests({
        method: 'GET',
        url:'cart/cartList'
    })
}

// 删除购物车某个商品
export const deleteShopCarGood = (skuId)=>{
    return requests({
        method: 'DELETE',
        url: `cart/deleteCart/${skuId}`
    })
}

// 修改购物车中商品选中属性
export const apiUpdateShopCarGood = ({skuID,isChecked})=>{
    return requests({
        method: 'GET',
        url: `cart/checkCart/${skuID}/${isChecked}`
    })
}
