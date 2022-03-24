import Vue from 'vue'
import App from './App.vue'

import router from '@/router'  // 导入路由

import store from '@/store'
// 引入mockServer.js，让其至少执行一次
import '@/mock/mockServe'

// 导入三级联动组件 ------ 全局组件
import TypeNav from '@/components/TypeNav'
// 导入轮播图组件 ------ 全局组件
import Carousel from '@/components/Carousel'
// 导入商品详情参数组件 ---- 全局组件
import Details from '@/components/Details'
// 导入分页器组件 ------ 全局组件
import Pagination from '@/components/Pagination'
// 导入登录注册页面底部-----全局组件
import LoginAndRegisterFooter from '@/components/LoginAndRegisterFooter'
// 注册全局组件
Vue.component('TypeNav',TypeNav) // 三级分类
Vue.component('Carousel',Carousel) // 轮播图
Vue.component('Details',Details)   // 商品参数组件
Vue.component('Pagination',Pagination) // 分页器组件
Vue.component('LoginAndRegisterFooter',LoginAndRegisterFooter)// 登录注册底部组件

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this // 全局事件总线
  }
}).$mount('#app')



