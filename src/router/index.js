import Vue from "vue"; // 引入Vue
import VueRouter from "vue-router"; // 引入vue-router
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter) // 使用Vue-router插件

const router = new VueRouter({
    //配置路由
    routes,
    // 路由跳转后页面进行滚动
    scrollBehavior() {
        return new Promise(resolve => {
            setTimeout(()=>{
                resolve({y: 0,behavior:'smooth'})
            },100)
        })
    }
})

// 先留一份原来的push方法
let originPush = VueRouter.prototype.push

//进行重新push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    //判断是否传入resolve和reject这两个回调
    if (resolve && reject) {
        //调用原来的push方法，并修改this的指向，因为之前指的是 window
        originPush.call(this,location,resolve,reject)
    } else {
        originPush.call(this,location, ()=>{}, ()=>{})
    }
}

// 重写replace方法
let originReplace = VueRouter.prototype.replace

//进行重新replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    //判断是否传入resolve和reject这两个回调
    if (resolve && reject) {
        //调用原来的push方法，并修改this的指向，因为之前指的是 window
        originReplace.call(this,location,resolve,reject)
    } else {
        originReplace.call(this,location, ()=>{}, ()=>{})
    }
}

// 全局路由前置守卫，去login不可以带token
router.beforeEach(async (to,from,next)=>{
    if(store.state.user.token) {
        if (to.name === 'login') {
            next('/') // 如果已经登陆了，不可以去登录
        }else {
            // 如果用户信息已经有了，直接跳转
           if(store.state.user.userInfo.nickName) {
               next()
           }else {
               // 如果没有用户信息，重新派发actions获取
               try {
                   // 重新发送获取用户信息请求
                   await store.dispatch('user/getUserInfo')
                   next()
               }catch (e) {
                   // 如果token失效了，跳转回首页，清除本地的token
                   await store.dispatch('user/loginOut')
                   next('/')
               }
           }
        }
    } else {
        // 未登录不可以去的路径
        let imPassablePath = ['shopcart','addcartsuccess','trade','myorder']
        // 判断是否去未登录的路径
        let flag = imPassablePath.some(item=>{
            return to.name.indexOf(item) !== -1
        })
        // 如果是去数组里面的路径
        if (flag) {
            // 跳转到登录页并且携带query参数
            next('/login')
        }else {
            next()
        }

    }
})

export default router
