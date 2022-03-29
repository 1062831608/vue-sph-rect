<template>
<!--交易页-->
<div>
  <!-- 买卖 -->
  <h3 class="title">填写并核对订单信息</h3>
<!--  交易信息-->
  <user-address></user-address>
</div>
</template>

<script>
import UserAddress from './UserAddress' // 用户交易页地址商品

export default {
  name: "Trade",
  components:{
    UserAddress,
  },
  mounted() {
    // 派发actions 获取订单页的数据
    this.$store.dispatch('trade/getTradeData')
  }
}
</script>

<style scoped lang="less">
.title{
  width:1200px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 21px;
}



</style>
