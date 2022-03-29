<template>
  <div>
    <div class="trade">
      <div class="price">应付金额:<span>¥{{ tradeData.totalAmount }}.00</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ userTradeInfo.deliveryAddress }}</span>
        收货人：<span >{{ userTradeInfo.consignee }}</span>
        <span>{{ userTradeInfo.consigneeTel }}</span>
      </div>
    </div>
    <!--  应付金额-->
      <div class="money clearFix">
        <ul>
          <li>
            <b><i>{{ tradeData.totalNum }}</i>件商品，总商品金额</b>
            <span>¥{{ tradeData.totalAmount }}.00</span>
          </li>
          <li>
            <b>返现：</b>
            <span>0.00</span>
          </li>
          <li>
            <b>运费：</b>
            <span>0.00</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  name: "TradeInfo",
  props:['userTradeInfo'],
  computed:{
    // 订单交易信息
    ...mapState('trade',['tradeData']),
    // 支付商品的信息
    ...mapGetters('trade',['detailArrayList']),
  }
}
</script>

<style scoped lang="less">
.trade{
  box-sizing: border-box;
  width: 1200px;
  padding: 10px;
  margin: 10px auto;
  text-align: right;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  div{
    line-height: 30px;
  }
  .price span{
    color:#e12228;
    font-weight: 700;
    font-size: 14px;
  }
  .receiveInfo{
    color:#999;
  }
}
.money{
  width: 1200px;
  margin: 20px auto;
  ul{
    width: 220px;
    float:right;
    li{
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      i{
        color:red;
      }
    }
  }
}
</style>
