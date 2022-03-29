<template>
<div>
  <div class="content">
    <h5 class="receive">收件人信息</h5>
    <div class="address clearFix">
      <!--      修改收货信息的框框-->
      <p class="addressInfoStyle" v-show="isEdit">
        <!--        收件人姓名-->
        <span>收件人：</span>
        <input type="text" class="addressUsername" v-model.trim="userTradeInfo.consignee" @change="userNameChecked">
        <!--        收件人的地址-->
        <span>收件地址：</span>
        <el-cascader
            v-model="aboutAddress"
            :options="options"
            :props="addressProps"
            size="mini"
        >
        </el-cascader>
        <span>详细地址：</span>
        <input type="primary" class="addressDetail" v-model.trim="detailAddress">
        <!--        收件人手机号-->
        <span>手机号：</span>
        <input type="number"
               class="addressTel"
               v-model.trim="userTradeInfo.consigneeTel"
        >
        <el-button
            type="text"
            @click="editAddress"
            class="primary"
        >确认</el-button>
        <button class="warn" @click="isEdit = !isEdit">取消</button>
      </p>
      <!--      刚进来默认收货信息的框框-->
      <p class="defaultAddress" v-show="!isEdit">
        <span>配送地址: {{ userTradeInfo.deliveryAddress }}</span>
        <span>收货人姓名：{{ userTradeInfo.consignee }}</span>
        <span>收件人电话：{{ userTradeInfo.consigneeTel }}</span>
        <button @click="isEdit = !isEdit">编辑</button>
      </p>
    </div>
    <div class="line"></div>
    <!--    支付方式-->
    <h5 class="pay">支付方式</h5>
    <div class="address clearFix">
      <span class="username selected">在线支付</span>
      <span class="username" style="margin-left:5px;">货到付款</span>
    </div>
    <div class="line"></div>
    <!--    送货清单-->
    <h5 class="pay">送货清单</h5>
    <div class="way">
      <h5>配送方式</h5>
      <div class="info clearFix">
        <span class="s1">天天快递</span>
        <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
      </div>
    </div>
    <div class="detail">
      <!--      商品清单-->
      <h5>商品清单</h5>
      <ul class="list clearFix" v-for="detailArray in detailArrayList" :key="detailArray.skuId">
        <li>
          <img class="goodImg" :src="detailArray.imgUrl" alt="">
        </li>
        <li>
          <p>{{ detailArray.skuName }}</p>
          <h4>7天无理由退货</h4>
        </li>
        <li>
          <h3>￥{{ detailArray.orderPrice }}.00</h3>
        </li>
        <li>X{{ detailArray.skuNum }}</li>
        <li>有货</li>
      </ul>
    </div>
    <div class="bbs">
      <h5>买家留言：</h5>
      <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="userTradeInfo.orderComment"></textarea>

    </div>
    <div class="line"></div>
    <div class="bill">
      <h5>发票信息：</h5>
      <div>普通发票（电子） 个人 明细</div>
      <h5>使用优惠/抵用</h5>
    </div>
  </div>
  <trade-handle :userTradeInfo="userTradeInfo"></trade-handle>
  <div class="sub clearFix">
    <a href="javascript:" class="subBtn" @click="submitOrder">提交订单</a>
  </div>
</div>
</template>

<script>
import TradeHandle from './TradeHandle'
import { mapGetters, mapState } from 'vuex'
import addressOption from '@/untils/getAddressList' // 全国各区县的配置项
import {MessageBox} from 'element-ui'

export default {
  name: "UserAddress",
  components:{
    TradeHandle
  },
  data(){
    return {
      traderNo:'', // 订单编号
      // 用户提交购买商品的表单的信息
      userTradeInfo:{
        consignee: '张三', // 收件人姓名
        consigneeTel: '11111111111', // 收件人电话
        deliveryAddress: '福建福州永泰福州工商学院', // 收件人地址
        paymentWay: 'ONLINE', // 支付方式
        orderComment: '', // 订单备注
        orderDetailList: [] // 存储多个商品对象的数组
      },
      // 省市地址，以数组的形式，第一个为省，第二个为市
      aboutAddress: [],
      // 详细地址
      detailAddress:'',
      // 控制修改收件信息的 flag
      isEdit: false,
      // 级联选择框数据
      options: addressOption(),
      // 级联选择框配置项
      addressProps: {
        value: 'label',
        children: 'children'
      }
    }
  },
  methods:{
    // 用户名长度校验
    userNameChecked(e) {
      let val = e.target.value
      if (val.length< 1 || val.length > 7) {
        val = ''
      }
    },
    // 确认修改地址
    editAddress() {
      this.userTradeInfo.deliveryAddress = this.userAddressInfo
      if (this.userTradeInfo.consigneeTel === '' || this.userTradeInfo.consignee === '' || this.userTradeInfo.deliveryAddress === '') {
        alert('请填写收件人信息')
        return
      }
      MessageBox.confirm('确认修改收件信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'primary',
        lockScroll: false
      }).then(() => {
        this.isEdit = !this.isEdit
      }).catch(() => {
        alert('已经取消')
      });
    },
    // 用户提交订单
    submitOrder() {
      // 调取发送订单的api，参数：tradeNo, userTradeInfo
      this.$API.apiSubmitOrder(this.traderNo, this.userTradeInfo).then(res=>{
        if (res.code === 200) {
          this.$router.replace({
            name:'pay',
            query: {
              orderId: res.data
            }
          })
        }else {
          alert(res.message)
          this.$router.replace({name: 'shopcart'})
        }
      })
    }
  },
  computed:{
    // 支付商品的信息
    ...mapGetters('trade',['detailArrayList']),
    // 订单信息
    ...mapState('trade',['tradeData']),
    // 用户填写的地址信息
    userAddressInfo(){
      let res = ''
      this.aboutAddress.forEach(item=>{
        res = res + item
      })
      return  res + this.detailAddress
    }
  },
  updated() {
    // 将订单数据存储在对象中中
    this.traderNo = this.tradeData.tradeNo
    this.userTradeInfo.orderDetailList = this.detailArrayList
  }
}
</script>

<style scoped lang="less">
.content{
  width: 1200px;
  margin: 10px auto 0;
  border:1px solid rgb(221, 221, 221);
  padding: 25px;
  box-sizing: border-box;
  .receive,.pay{
    line-height: 36px;
    margin:18px 0;
  }
  .address{
    padding-left: 20px;
    margin-bottom: 15px;
    .username{
      float:left;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border:1px solid #ddd;
      position: relative;
    }
    .addressInfoStyle {
      width: 100%;
      span {
        font-size: 14px;
        color: #7f7c7c;
        margin-left: 10px;
      }
      input {
        height: 28px;
        outline: none;
        border: 0;
        border: 1px solid #8c8c8c;
        padding-left: 3px;
      }
      // 收件用户名输入框
      .addressUsername {
        width: 100px;
      }
      // 收件详细地址输入框
      .addressDetail {
        width: 200px;
      }
      // 收件人的手机号
      .addressTel {
        width: 150px;
      }
      button {
        padding: 4px 12px;
        margin: 0 10px;
        color: #fff;
        border: 0;
        cursor: pointer;
        &:hover {
          opacity: .5;
        }
      }
      .warn {
        background-color: red;
        padding: 3px 10px;
        font-size: 14px;
      }
      .primary {
        background-color: blue;
        padding: 5px 10px;
        border-radius: 0;
      }
    }
    .defaultAddress {
      position: relative;
      width: 100%;
      background-color: #efeeee;
      padding: 20px 30px;
      span {
        margin-right: 25px;
      }
      button {
        position: absolute;
        top: 10px;
        right: 20px;
        padding: 6px 14px;
        background-color: #fff;
        border: 0;
        border: 1px solid #cccccc;
        box-shadow: 2px 2px #d5d5d5;
        cursor: pointer;
        &:hover {
          background-color: lightpink;
        }
      }
    }
    .username::after{
      content:"";
      display: none;
      width: 13px;
      height: 13px;
      position: absolute;
      right: 0;
      bottom: 0;
      background: url(../images/choosed.png) no-repeat;
    }
    .username.selected{
      border-color:#e1251b;
    }
    .username.selected::after{
      display: block;
    }
    p{
      width:610px;
      float:left;
      line-height: 30px;
      margin-left: 10px;
      padding-left: 5px;
      //cursor: pointer;
      .s1{
        float:left;

      }
      .s2{
        float:left;
        margin: 0 5px;
      }
      .s3{
        float:left;
        width:56px;
        height:24px;
        line-height: 24px;
        margin-left: 10px;
        background-color: #878787;
        color: #fff;
        margin-top: 3px;
        text-align: center;
      }
    }
  }
  .line{
    height: 1px;
    background-color: #ddd;
  }
  .way{
    width: 1080px;
    height: 110px;
    background: #f4f4f4;
    padding:15px;
    margin: 0 auto;
    h5{
      line-height: 50px;
    }
    .info{
      margin: 20px 0;
      .s1{
        float:left;
        border: 1px solid #ddd;
        width: 120px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        margin-right: 10px;
        background-color: #fff;
        font-weight: 700;
        color: red;
      }
      p{
        line-height: 30px;
      }
    }
  }
  .detail{
    width: 1080px;

    background: #feedef;
    padding:15px;
    margin: 12px auto 0;
    h5{
      line-height: 50px;
    }
    .list{
      display: flex;
      justify-content: space-between;
      li{
        line-height: 30px;
        p{

          margin-bottom: 20px;
        }
        .goodImg {
          width: 100px;
          height: 100px;
        }
        h4{
          color:#c81623;
          font-weight: 400;
        }
        h3{

          color: #e12228;
        }
      }
    }
  }
  .bbs{
    margin-bottom: 15px;
    h5{
      line-height: 50px;
    }
    textarea{
      width: 100%;
      border-color: #e4e2e2;
      line-height: 1.8;
      outline: none;
      resize: none;
    }
  }
  .bill{
    h5{
      line-height: 50px;
    }
    div{
      padding-left: 15px;
    }
  }
  .remarks-cont {
    padding-left: 5px;
  }
}
.sub{
  width: 1200px;
  margin: 0 auto 10px;
  .subBtn{
    float:right;
    width:164px;
    height: 56px;
    font:700 18px "微软雅黑";
    line-height: 56px;
    text-align: center;
    color:#fff;
    background-color: #e1251b;

  }
}
</style>
