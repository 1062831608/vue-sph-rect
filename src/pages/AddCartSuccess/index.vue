<template>
<!--  添加购物车成功后的进入的页面-->
  <div class="mainBox">
    <div class="container">
<!--      提示信息-->
      <div class="tip"><span class="block"></span>商品已经成功加入购物车!</div>
<!--      购物车缓存区列表-->
      <div class="cartList">
<!--        商品图片-->
        <img :src="skuInfo.skuDefaultImg" alt="">
<!--        商品信息介绍-->
        <div class="info">
          <p>{{ skuInfo.skuName }}</p>
          <h6>{{ skuInfo.skuDesc }}---数量: {{ addShopCartNum }}</h6>
        </div>
        <router-link :to="{name: 'shopcart'}">去购物车结算> </router-link>
<!--        跳转到这个商品的详细页面-->
        <router-link :to="{
          name: 'detail',
          params:{
            skuId: 3
          }
        }">查看商品详情</router-link>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCartSuccess",
  data() {
    return {
      addShopCartNum: 0, // 添加购物车商品的个数
      skuInfo: {}   // 添加购物车商品的信息
    }
  },
  mounted() {
    // 将sessionStore中存储的值给skuInfo
    // 将路由中携带的query参数的值给addShopCartNum
    this.addShopCartNum =  this.$route.query.shopcartnum
    this.skuInfo = JSON.parse(sessionStorage.getItem('addCartObj'))
  }
}
</script>

<style scoped lang="less">
.mainBox {
  width: 100%;
  background-color: #f3f0f0;
  .container {
    width: 1200px;
    margin: 0 auto;
    // 提示区域
    .tip {
      padding: 25px 0;
      font-size: 14px;
      font-weight: 700;
      color: limegreen;
      // 提示左边的小方块
      .block {
        display: inline-block;
        width: 5px;
        height: 25px;
        margin-right: 8px;
        border: 3px limegreen solid;
        border-radius: 8px;
        transform: translateY(25%);
      }
    }
    // 购物车缓冲列表
    .cartList {
      height: 80px;
      padding: 5px 0;
      img {
        float: left;
        height: 70px;
        width: 70px;
      }
      .info {
        float: left;
        width: 600px;
        padding: 5px 10px;
        h6 {
          font-weight: 400;
          color: #8c8c8c;
        }
      }
      a {
        display: block;
        float: right;
        height: 25px;
        line-height: 25px;
        padding: 0 25px;
        margin-right: 10px;
        border: 0;
        background-color: #fff;
        text-decoration: none;
        &:hover {
          background-color: #cccccc;
        }
      }
    }
  }
}
</style>
