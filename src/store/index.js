import Vue from 'vue'
import Vuex from 'vuex'

import {home} from './home' // 主页
import {search} from './search' // 搜索页
import {detail} from './detail' // 商品详情页
import {shopcar} from "@/store/shopcar"; // 购物车数据页面
import {user} from "@/store/user";// 注册页面
import trade from "@/store/trade" // 订单交易

Vue.use(Vuex)  // 使用Vuex

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcar,
        user,
        trade
    }
})
