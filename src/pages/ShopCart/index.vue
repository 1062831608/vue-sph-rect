<template>
  <!-- 购物车列表 -->
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!--        购物车商品列表-->
        <ul v-for="cartInfo in shopObj.cartInfoList" :key="cartInfo.id" class="cart-list">
          <!--          购物车商品是否被选择-->
          <li class="cart-list-con1">
            <input :checked="cartInfo.isChecked"
                   name="chk_list"
                   type="checkbox"
                   @click="changeGoodState(cartInfo)"
            >
          </li>
          <!--          商品图片以及商品名称-->
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <!--          商品类型-->
          <li class="cart-list-con3">
            <div class="item-txt">测试产品</div>
          </li>
          <!--          商品价格-->
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}</span>
          </li>
          <!--          商品数量-->
          <li class="cart-list-con5">
            <!--            商品数量减一个-->
            <button
                :disabled="cartInfo.skuNum <= 1"
                class="mins"
                href="javascript:"
                @click="handler('reduce',cartInfo)"
            >-
            </button>
            <input
                :value="cartInfo.skuNum"
                autocomplete="off"
                class="itxt"
                minnum="1"
                type="text"
                @change="handler('change',cartInfo,$event)"
            >
            <!--            商品数量加一个-->
            <button
                class="plus"
                href="javascript:"
                @click="handler('add',cartInfo)"
            >+
            </button>
          </li>
          <!--          商品小计-->
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.cartPrice }}</span>
          </li>
          <!--          删除购物车的商品-->
          <li class="cart-list-con7">
            <a class="sindelet" href="javascript:" @click="deleteGood(cartInfo.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
            :checked="isAllChecked"
            class="chooseAll"
            type="checkbox"
            @click="changeAllGoodState"
        >
        <span>全选</span>
      </div>
      <div class="option">
        <a
            href="javascript:"
            @click="deleteAllCheckedGoods"
        >删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <!--        商品的总价格-->
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ shopCartPriceSum }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import debounce from 'lodash.debounce'  // lodash库中防抖的方法
import throttle from 'lodash/throttle'  // lodash库中节流的方法

export default {
  name: "ShopCart",
  methods: {
    // 派发Actions获取购物车的数据
    getShopCar() {
      this.$store.dispatch('shopcar/getShopCarData')
    },
    // 派发actions发送修改商品状态的请求
    updateShopState(goodObj) {
      return this.$store.dispatch('shopcar/updateShopCarState', goodObj)
    },
    // 派发actions和服务器说购物车商品的数据发生了变化一个
    handler: debounce(async function (type, goodsInfo, e) {
      let skuVal = 0 // 需要添加到购物车的数据
      switch (type) {
        case 'add': // 增加一个数据
          skuVal = 1
          break;
        case 'reduce': // 减少一个数据
          skuVal = -1
          break;
        case 'change': { // input框数据发生变化
          let val = e.target.value * 1
          if (isNaN(val) || val < 1 || val === goodsInfo.skuNum) {
            skuVal = 0
          } else {
            skuVal = parseInt(val) - goodsInfo.skuNum
          }
          break;
        }
      }
      try {
        await this.$store.dispatch('detail/actionAddOrUpdateShopCar', {skuId: goodsInfo.skuId, skuNum: skuVal})
        // 再次派发actions获取购物车数据
        this.getShopCar()
      } catch (e) {
        console.log(e)
      }
    }, 200),
    // 派发actions删除购物车的商品数据
    deleteGood(id) {
      this.$store.dispatch('shopcar/deleteShopCarData', id).then(() => {
        alert('删除成功')
      }).then(() => {
        // 派发actions获取购物车数据
        this.getShopCar()
      }).catch((err) => {
        console.log(err)
      })
    },
    // 修改一个商品选中的状态
    changeGoodState: throttle(async function (cartInfo) {
      // 判断isCheckedFlag的值，进行修改
      let isCheckedFlag = 1
      if (cartInfo.isChecked) {
        isCheckedFlag = 0
      }
      // 派发action修改商品选中状态
      try {
        // 修改商品状态
        await this.updateShopState({skuID: cartInfo.skuId, isChecked: isCheckedFlag})
        this.getShopCar()
      } catch (e) {
        console.log(e)
      }
    }, 500),
    // 修改所有商品选中的状态
    changeAllGoodState: debounce(async function () {
      try{
        await this.$store.dispatch('shopcar/changeAllGoodsIsChecked',this.isAllChecked)
        this.getShopCar()
      }catch (e) {
        console.log(e)
      }
    }, 200),
    // 删除所有选中的商品
    deleteAllCheckedGoods: debounce(function () {
      // 派发actions删除所有商品，actions返回的是一个promise
      this.$store.dispatch('shopcar/deleteAllCheckedGoods').then(() => {
        // 重新获取购物车数据
        this.getShopCar()
      }).catch((e) => {
        console.log(e)
      })
    }, 500)
  },
  mounted() {
    // 派发actions获取购物车的数据
    this.getShopCar()
  },
  computed: {
    // 购物车列表数据
    ...mapGetters('shopcar', ['shopObj']),
    // 购物车商品的总价
    shopCartPriceSum() {
      // filter先过滤掉没有被选中的购物车商品
      let alreadyArr = []
      if (this.shopObj.cartInfoList) {
        alreadyArr = this.shopObj.cartInfoList.filter(item => {
          return item.isChecked === 1
        })
      } else {
        alreadyArr = []
      }
      // 通过reduce来统计总价为多少
      return alreadyArr.reduce((pre, current) => {
        return current.cartPrice * current.skuNum + pre
      }, 0)
    },
    // 判断商品是否全选
    isAllChecked() {
      // 用 every 来进行判断,因为every返回的是一个布尔值
      let res = false
      if (this.shopObj.cartInfoList) {
        res = this.shopObj.cartInfoList.every(item => item.isChecked === 1)
      }
      return res
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3, .cart-th4, .cart-th5, .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;

        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 10px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 10px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
            color: red;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
