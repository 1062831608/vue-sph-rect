<template>
  <div class="InfoWrap">
<!--    商品信息-->
    <div class="goodsDetail">
      <h3> {{ skuInfo.skuName }} </h3>
      <p class="tip">{{ skuInfo.skuDesc }}</p>
      <div class="pricearea">
        <div class="price">
          <i class="title">价 &nbsp;&nbsp;&nbsp; 格</i>
          <span class="red bigPrice">￥</span>
          <span class="red bigPrice">{{ skuInfo.price }}</span>
          <span class="red">降价通知</span>
          <div class="pinjia">累积评价：345684</div>
        </div>
        <div class="msg">
           <i class="title">促 &nbsp;&nbsp;&nbsp; 销</i>
          <i class="cuxiao">加购价</i>
          满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品
        </div>
      </div>
      <p>
        <i class="title">支 &nbsp;&nbsp;&nbsp; 持</i>
        <i class="content">以旧换新，闲置手机回收 4G套餐超值抢 礼品购</i>
      </p>
      <p>
        <i class="title">配&nbsp;送&nbsp;至</i>
        <i class="content">广东省&nbsp;深圳市&nbsp;宝安区</i>
      </p>
    </div>
<!--    商品属性选择模块-->
    <div class="choose">
      <ul>
        <li v-for="attrselect in spuSaleAttrList" :key="attrselect.id">
          <p>{{ attrselect.saleAttrName }}</p>
          <button
              v-for="attr in attrselect.spuSaleAttrValueList"
              :key="attr.id"
              :class="{activateAttr : attr.isChecked === '1'}"
              @click="selectAttr(attr, attrselect.spuSaleAttrValueList)"
          >{{ attr.saleAttrValueName }}</button>
        </li>
      </ul>
    </div>
<!--    加入购物车模块-->
    <div class="joinCart">
<!--      显示当要加入购物车的数量-->
      <input type="text"
             class="numInput"
             v-model.number="shopCartNum"
      >
<!--      增加和减少购物车数量的按钮-->
      <button>+</button>
      <button>-</button>
<!--      添加购物车-->
      <button class="addShopCar">添加购物车</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "SelectorParams",
  data() {
    return {
      shopCartNum: 1,
      attrsIndex: 0
    }
  },
  methods:{
    // 选择属性
    selectAttr(a, b) {  // a：当前点击的那个数组的对象 ; b: 当前的数组
      // 使用排它思想，点击后切换样式
      b.forEach(item=>{
        item.isChecked = '0'
      })
      a.isChecked = '1'
    }
  },
  computed:{
    ...mapGetters('detail',['skuInfo','spuSaleAttrList'])
  }
}
</script>

<style scoped lang="less">
.InfoWrap{
  width: 700px;
  float: right;
  // 产品信息样式
  .goodsDetail {
    border-bottom: 1px #ccc solid;
    .tip {
      color: red;
      margin: 15px 0;
    }
    .pricearea {
      display: flex;
      height: 110px;
      padding: 10px;
      background-color: rgba(255, 203, 240, 0.4);
      flex-direction: column;
      margin-bottom: 15px;
      .price {
        position: relative;
        color: #9a9898;
        font-size: 13px;
        margin-bottom: 10px;
        .red {
          color: red;
        }
        .bigPrice {
          margin: 0 3px;
          font-size: 28px;
          font-weight: 700;
        }
        .pinjia {
          position: absolute;
          top: 10px;
          right: 0;
        }
      }

    }

    .title {
      font-size: 13px;
      color: #333333;
      font-weight: 400;
    }
    .content {
      font-size: 13px;
      color: #a7a5a5;
      margin-left: 8px;
    }
    p {
      margin-bottom: 15px;
    }
    .cuxiao {
      background-color: red;
      padding: 3px;
      margin-left: 4px;
      color: #ffffff;
    }
  }
  // 选择样式
  .choose {
    padding-top: 25px;
    ul {
      li {
        display: flex;
        margin-bottom: 20px;
        p {
          margin-right: 15px;
        }
        button {
          margin: -4px 10px 0 0;
          padding: 4px 10px;
          border: 0;
          border-bottom: 1px #cccccc solid;
          background-color: #f3f2f2;
          box-shadow: 1px 1px 1px #cccccc;
        }

        // 被选中的属性样式
        .activateAttr {
          border: 1px solid #f8f808;
          background-color: #ffffff;
          color: green;
        }
      }
    }
  }
  // 加入购物车模块
  .joinCart {
    padding-left: 380px;
    // 想要添加到购物车的数据的选择框
    .numInput {
      width: 35px;
      height: 25px;
      padding-left: 12px;
    }

    button {
      padding: 1px 6px;
      font-size: 14px;
      cursor: pointer;
    }

    .addShopCar {
      padding: 5px 10px;
      background-color: red;
      border: 0;
      color: #fff;
      margin-left: 20px;
    }
  }


}
</style>
