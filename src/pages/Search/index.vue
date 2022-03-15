<template>
  <div>
    <type-nav></type-nav>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <Bread :breadData="searchParams"></Bread>
        <!--details-->
        <Details></Details>
        <!--selector-->
       <Selector :paramsData="searchParams"></Selector>
        <!--hotsale-->
        <hot-sale></hot-sale>
      </div>
    </div>
  </div>
</template>

<script>
import Bread from './Bread' // 面包屑组件
import Selector from './Selector' // 商品选择组件
import HotSale from './Hotsale' // 火热售卖组件

export default {
  name: "Search",
  components:{
    Bread,
    Selector,
    HotSale
  },
  data() {
    return {
      // 获取search页面传递的参数
      searchParams:{
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        "categoryName": "",
        "keyword": "",
        "order": "",
        "pageNo": 1,
        "pageSize": 10,
        "props": [],
        "trademark": ""
      }
    }
  },
  methods:{
    getSearch() {
      this.$store.dispatch('search/getSearchData',this.searchParams)
    }
  },
  beforeMount() {
    // 跳转到这个页面时，收集一下数据
    Object.assign(this.searchParams, this.$route.params, this.$route.query)
  },
  mounted() {
    this.getSearch()
    // 自定义事件控制切换当页的数据
    this.$bus.$on('changePage',(pageNum)=>{
      this.searchParams.pageNo = pageNum
      this.getSearch()
    })
  },
  watch:{
    // 监测路由信息变化，重新发出请求
    $route(newVal) {
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.searchParams.pageNo = 1
      Object.assign(this.searchParams, newVal.params, newVal.query )
      this.getSearch()
    }
  }
}
</script>

<style lang="less">
.main{
  margin: 10px 0;
  .py-container{
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
