import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";

export default [
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
        component: Login
    },
    {
        name: 'register',
        path: '/register',
        component: Register
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
    // 重定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]
