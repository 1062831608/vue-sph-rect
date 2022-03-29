// 生产环境

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
// 按需引入element ui
import { Cascader,MessageBox,Button, Dialog } from 'element-ui'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 路由懒加载的图片
import loadingPic from '/public/images/csr&&clx.png'

// 注册全局组件
Vue.component('TypeNav',TypeNav) // 三级分类
Vue.component('Carousel',Carousel) // 轮播图
Vue.component('Details',Details)   // 商品参数组件
Vue.component('Pagination',Pagination) // 分页器组件
Vue.component('LoginAndRegisterFooter',LoginAndRegisterFooter)// 登录注册底部组件
Vue.component(Cascader.name, Cascader) // 级联选择框
Vue.component(MessageBox.name,MessageBox) // 确认框
Vue.component(Button.name, Button) // 按钮
Vue.component(Dialog.name, Dialog) // 弹出框
Vue.prototype.$alert = MessageBox.alert
// 引入全部api接口，挂载到Vue的原型上面
import * as API from '@/api'

// 使用图片懒加载的插件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // 图片还未加载时的路径
  loading: loadingPic,
  attempt: 1
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this, // 全局事件总线
    Vue.prototype.$API = API   // API 是一个对象，里面包含接口文件中的所有接口
  }
}).$mount('#app')



