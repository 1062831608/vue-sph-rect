<template>
  <div class="details clearfix">
    <div class="sui-navbar">
      <div class="navbar-inner filter">
        <ul class="sui-nav" @click="changeOrder">
          <li
              :class="isActivated === 'default'?'active':''"
          >
            <a
                href="javascript:"
                v-if="comprehensiveOrder"
            >综合↑</a>
            <a
                href="javascript:"
                v-if="!comprehensiveOrder"
            >综合↓</a>
          </li>
          <!--          价格升序-->
          <li
              :class="isActivated === 'asc'?'active':''"
          >
            <a
                data-asc="asc"
                href="javascript:">价格⬆</a>
          </li>
          <!--          价格降序-->
          <li
              :class="isActivated === 'desc'?'active':''"
          >
            <a
                data-desc="desc"
                href="javascript:">价格⬇</a>
          </li>
        </ul>
      </div>
    </div>
    <!--    商品展示列表-->
    <div class="goods-list">
      <ul
          class="yui3-g"
      >
        <li
            class="yui3-u-1-5"
            v-for="good in goodsList"
            :key="good.id"
            @click="toDetail(good.id)"
        >
          <div class="list-wrap" >
            <div class="p-img">
              <a
                  href="javascript:"
              >
                <img v-lazy="good.defaultImg"/>
              </a>
            </div>
            <div class="price">
              <strong>
                <em>¥</em>
                <i>{{ good.price }}</i>
              </strong>
            </div>
            <div class="attr">
              <a :title="good.title">{{ good.title }}</a>
            </div>
            <div class="commit">
              <i class="command">已有<span>2000</span>人评价</i>
            </div>
            <div class="operate">
              <a class="sui-btn btn-bordered btn-danger">加入购物车</a>
              <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--    分页器-->
    <div class="paginationStyle">
      <Pagination
          :total="goodsData.total"
          :pageNo="goodsData.pageNo"
          :continues="5"
          :emitName="'changePage'"
          :pageSize="goodsData.pageSize"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Selector",
  // 发送请求的参数
  props:['paramsData'],
  data() {
    return {
      newParamsData: this.paramsData,
      isActivated: 'default',  // 判断是否高亮激活
      comprehensiveOrder: true  // 控制综合排序，默认为升序
    }
  },
  methods:{
    // 切换商品的排序方式
    // 1:asc 综合升序， 1:desc 综合降序 2:asc 价格升序 2: desc 价格降序
    changeOrder(e) {
      let element = e.target
      let {asc, desc} = element.dataset
      if (asc) {
        this.newParamsData.order = "2:asc"
        this.$store.dispatch('search/getSearchData',this.paramsData)
        this.isActivated = 'asc'
      }else if (desc) {
        this.newParamsData.order = "2:desc"
        this.$store.dispatch('search/getSearchData',this.paramsData)
        this.isActivated = 'desc'
      }else {
        if (this.comprehensiveOrder) {
          this.newParamsData.order = '1:asc'
          this.comprehensiveOrder = false
        } else {
          this.newParamsData.order = "1:desc"
          this.comprehensiveOrder = true
        }
        this.$store.dispatch('search/getSearchData',this.paramsData)
        this.isActivated = 'default'
      }
    },
    // 点击商品跳转到商品详情页面，并且将id带过去
    toDetail(id) {
      this.$router.push({
        name: 'detail',
        params: {
          skuId: id
        }
      })
    }
  },
  computed:{
    ...mapGetters('search',['goodsList']),
    goodsData() {
      return this.$store.state.search.searchData
    }
  },
}
</script>

<style scoped lang="less">
.details{
  position: relative;
  .paginationStyle {
    position: absolute;
    bottom: -70px;
    left: 50%;
    transform: translateX(-50%);
  }
  margin-bottom: 71px;
  .sui-navbar{
    overflow: visible;
    margin-bottom: 0;
    .filter{
      min-height: 40px;
      padding-right: 20px;
      background: #fbfbfb;
      border: 1px solid #e2e2e2;
      padding-left: 0;
      border-radius: 0;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
      .sui-nav{
        position: relative;
        left: 0;
        display: block;
        float: left;
        margin: 0 10px 0 0;
        li{
          float: left;
          line-height: 18px;
          a{
            display: block;
            cursor: pointer;
            padding: 11px 15px;
            color: #777;
            text-decoration: none;
          }
          &.active{
            a{
              background: #e1251b;
              color: #fff;
              &:hover {
                color: #ffffff !important;
              }
            }
          }
        }
      }
    }
  }
  .goods-list{
    margin: 20px 0;
    ul{
      display:flex;
      flex-wrap:wrap;
      li{
        height: 100%;
        width: 20%;
        margin-top: 10px;
        line-height: 28px;
        .list-wrap{
          .p-img{
            padding-left: 15px;
            width: 215px;
            height: 255px;
            a{
              color: #666;
              img{
                max-width: 100%;
                height: 255px;
                vertical-align: middle;
              }
            }
          }
          .price{
            padding-left: 15px;
            font-size: 18px;
            color: #c81623;
            strong{
              font-weight: 700;
              i{
                margin-left: -5px;
              }
              em {
                margin-right: 5px;
              }
            }
          }
          .attr{
            padding-left: 15px;
            width: 85%;
            overflow: hidden;
            margin-bottom: 8px;
            min-height: 38px;
            cursor: pointer;
            line-height: 1.8;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            a{
              color: #333;
              text-decoration: none;
            }
          }
          .commit{
            padding-left: 15px;
            height: 22px;
            font-size: 13px;
            color: #a7a7a7;
            span{
              font-weight: 700;
              color: #646fb0;
            }
          }
          .operate{
            padding: 12px 15px;
            .sui-btn{
              display: inline-block;
              padding: 2px 14px;
              box-sizing: border-box;
              margin-bottom: 0;
              font-size: 12px;
              line-height: 18px;
              text-align: center;
              vertical-align: middle;
              cursor: pointer;
              border-radius: 0;
              background-color: transparent;
              margin-right: 15px;
            }
            .btn-bordered{
              min-width: 85px;
              background-color: transparent;
              border: 1px solid #8c8c8c;
              color: #8c8c8c;
              &:hover{
                border: 1px solid #666;
                color: #fff!important;
                background-color: #666;
                text-decoration: none;
              }
            }
            .btn-danger{
              border: 1px solid #e1251b;
              color: #e1251b;
              &:hover{
                border: 1px solid #e1251b;
                background-color: #e1251b;
                color:white!important;
                text-decoration: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
