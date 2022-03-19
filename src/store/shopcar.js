import { getShopcarList, deleteShopCarGood, apiUpdateShopCarGood } from "@/api"; // 获取购物车列表的api
import {getUUID} from "@/untils/get_uuid";


export const shopcar = {
    namespaced: true,
    state:{
        shopCarList: [],// 购物车数据
        uuid_token: getUUID() // 游客uuid
    },
    actions: {
        // 获取购物车数据
        async getShopCarData({commit}) {
            let res =  await getShopcarList()
            if (res.code === 200) {
                commit('GETSHOPCARDATA', res.data)
            }
        },
        // 删除购物车的商品
        async deleteShopCarData({commit},val) {

            let res = await deleteShopCarGood(val)
            if (res.code === 200) {
                return Promise.resolve('ok')
            }else {
                return Promise.reject('fail')
            }
        },
        // 修改购物车中商品的选中状态
        async updateShopCarState({commit}, valObj) {
            let res = await apiUpdateShopCarGood(valObj)
            if (res.code === 200) {
                return 'ok'
            }else {
                return Promise.reject('fail')
            }
        },
        // 删除购物车所有被选中的商品
        deleteAllCheckedGoods({getters, dispatch}) {
            let promiseArr = [] // 存放每次成功或者失败的promise
            getters.shopObj.cartInfoList.forEach(item=>{
                if (item.isChecked ===1 ) {
                    let result = dispatch('deleteShopCarData', item.skuId)
                    // 将每次promise返回的结果存放在promiseArr中
                    promiseArr.push(result)
                }
            })
            // 只要都成功返回的就成功，如果有一个失败，返回的即为失败的结果
            return Promise.all(promiseArr)
        },
        // 修改所以商品的选中状态
        changeAllGoodsIsChecked({getters, dispatch},val) {
            let reverseIsChecked = 1 // 和当前的是否全选的值相反的
            if (val) {
                reverseIsChecked = 0
            }
            let promiseArr = [] // 存放每次成功或者失败的promise
            // 派发改变状态的actions，将状态改变为reverseIsChecked
            getters.shopObj.cartInfoList.forEach(item=>{
                if (item.isChecked !== reverseIsChecked){
                    let res = dispatch('updateShopCarState',{skuID: item.skuId,isChecked: reverseIsChecked})
                    promiseArr.push(res)
                }
            })
            return Promise.all(promiseArr)
        }
    },
    mutations: {
        GETSHOPCARDATA(state,res) {
            state.shopCarList = res
        }
    },
    getters:{
        // 包裹购物车列表的那个对象
        shopObj(state) {
            return state.shopCarList[0] || {}
        }
    }
}
