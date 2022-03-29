// 一级路由
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import RegisterSuccess from '@/pages/Register/RegisterSuccess'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 二级路由
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

export default [
    {
        name: 'center',
        path: '/center',
        component: Center,
        meta:{
            footerIsShow: true
        },
        redirect: 'myorder',
        children:[
            {
                name: 'myorder',
                path: 'myorder',
                component: MyOrder
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: GroupOrder
            }
        ]
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
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
        component: Pay,
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
        component: Home,
        meta: {
            footerIsShow: true  //控制footer组件显示还是隐藏
        }
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
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
        component: Detail
    },
    {
        name:'addcartsuccess',
        path:'/addCartSuccess',
        component: AddCartSuccess,
        meta: {
            footerIsShow: true
        }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: {
            footerIsShow: true
        }
    },
    {
        name: 'registersuccess',
        path:'/registersuccess',
        component: RegisterSuccess
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
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
