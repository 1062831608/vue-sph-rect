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

// 获取验证码
export const apiGetCode =(phone)=>{
    return requests({
        method:'GET',
        url:`/user/passport/sendCode/${phone}`
    })
}

// 提交表单信息注册
export const apiRegister = (userInfo)=>{
    return requests({
        method:'POST',
        url:'user/passport/register',
        data:{
            phone:userInfo.phone,
            password:userInfo.password,
            code:userInfo.code
        }
    })
}

// 提交登录信息注册
export const apiLogin = (loginInfo)=>{
    return requests({
        method:'POST',
        url:'user/passport/login',
        data:{
            phone: loginInfo.phone,
            password: loginInfo.password
        }

    })
}

// 退出登录
export const apiLoginOut = ()=>{
    return requests({
        method:'GET',
        url:'user/passport/logout'
    })
}

// 获取用户登录信息
export const apiGetUserInfo = ()=>{
    return requests({
        method:'GET',
        url:'user/passport/auth/getUserInfo'
    })
}

// 获取订单交易页数据
export const apiGetTradeData = ()=>{
    return requests({
        method: 'GET',
        url:'order/auth/trade'
    })
}

// 提交订单
export const apiSubmitOrder = (tradeNo, data)=>{
    return requests({
        method: 'POST',
        data,
        url:`order/auth/submitOrder?tradeNo=${tradeNo}`
    })
}

// 获取订单支付信息
export const apiGetOrderInfo = (orderId)=>{
    return requests({
        method: 'GET',
        url: `payment/weixin/createNative/${orderId}`
    })
}

// 询问服务器订单是否支付成功
export const apiOrderState = (orderId)=>{
    return requests({
        method: 'GET',
        url: `payment/weixin/queryPayStatus/${orderId}`
    })
}

// 获取我的订单列表 page: 当前页码, limit：一页展示多少条数据
export const apiGetOrderList = (page,limit)=>{
    return requests({
        method: 'GET',
        url: `order/auth/${page}/${limit}`
    })
}
