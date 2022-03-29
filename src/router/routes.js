// 使用了路由懒加载技术

export default [
    {
        name: 'center',
        path: '/center',
        component: ()=>import("@/pages/Center"),
        meta:{
            footerIsShow: true
        },
        redirect: 'myorder',
        children:[
            {
                name: 'myorder',
                path: 'myorder',
                component: ()=>import("@/pages/Center/MyOrder")
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: ()=>import("@/pages/Center/GroupOrder")
            }
        ]
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: ()=>import("@/pages/PaySuccess"),
        meta:{
            footerIsShow: true
        },
        // 只能从支付页面进来
        beforeEnter(to, from, next) {
            if ( from.name === 'pay') {
                next()
            }else {
                next('/')
            }
        }
    },
    {
        name:'pay',
        path:'/pay',
        component: ()=>import("@/pages/Pay"),
        meta:{
            footerIsShow: true
        },
        // 只能从交易页进入到支付页面
        beforeEnter(to, from, next) {
            if (from.name === 'trade') {
                next()
            }else {
                next('/')
            }
        }
    },
    {
        name: 'home',
        path: '/home',
        component: ()=>import("@/pages/Home"),
        meta: {
            footerIsShow: true  //控制footer组件显示还是隐藏
        }
    },
    {
        name: 'login',
        path: '/login',
        component: ()=>import("@/pages/Login"),
    },
    {
        name: 'register',
        path: '/register',
        component: ()=>import("@/pages/Register"),
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: ()=>import("@/pages/Search"),
        meta: {
            footerIsShow: true  //控制footer组件显示还是隐藏
        },
        props: true
    },
    {
        name: 'detail',
        path:'/detail/:skuId?',
        meta: {
            footerIsShow: true
        },
        component: ()=>import("@/pages/Detail")
    },
    {
        name:'addcartsuccess',
        path:'/addCartSuccess',
        component: ()=>import("@/pages/AddCartSuccess"),
        meta: {
            footerIsShow: true
        }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ()=>import("@/pages/ShopCart"),
        meta: {
            footerIsShow: true
        }
    },
    {
        name: 'registersuccess',
        path:'/registersuccess',
        component: ()=>import("@/pages/Register/RegisterSuccess")
    },
    {
        name: 'trade',
        path: '/trade',
        component: ()=>import("@/pages/Trade"),
        meta:{
            footerIsShow: true
        },
        // 只能从购物车进入到交易页面
        beforeEnter(to, from, next) {
            if (from.name === 'shopcart') {
                next()
            }else {
                next('/')
            }
        }
    },
    // 重定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]
