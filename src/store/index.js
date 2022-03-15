import Vue from 'vue'
import Vuex from 'vuex'

import {home} from './home' // 主页
import {search} from './search' // 搜索页
import {detail} from './detail' // 商品详情页
Vue.use(Vuex)  // 使用Vuex

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail
    }
})