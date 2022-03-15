<template>
  <!--bread-->
  <div class="bigBox">
    <span>北木的项目</span>
    <div class="bread">
      <ul class="sui-breadcrumb">
        <li>
          <a href="#">全部结果</a>
        </li>
      </ul>
      <ul class="sui-tag">
        <!--        分类标签页-->
        <li v-if="newParams.categoryName" class="with-x">
          {{ $route.query.categoryName }}
          <i @click="backSearchIndex('query')">x</i>
        </li>
        <!--        关键字-->
        <li v-if="newParams.keyword" class="with-x">
          {{ $route.params.keyword }}
          <i @click="backSearchIndex('params')">x</i>
        </li>
        <!--        品牌-->
        <li v-if="newParams.trademark" class="with-x">
          {{ newParams.trademark.split(':')[1] }}
          <i @click="clearBrandBread">x</i>
        </li>
        <!--        分类参数-->
        <li
            v-for="(p,index) in newParams.props"
            :key="index"
             class="with-x">
            {{ p.split(':')[1] }}
          <i @click="clearAttrBread(index)">x</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bread",
  props: ['breadData'],
  data() {
    return {
      newParams: this.breadData
    }
  },
  methods: {
    // 给面包屑打叉，重新跳转路由
    // 传 query为 删除分类的面包屑
    // 传 params为 删除关键字的面包屑
    backSearchIndex(type) {
      if (type === 'query') {
        this.newParams.category1Id = undefined
        this.newParams.category2Id = undefined
        this.newParams.category3Id = undefined
        this.newParams.categoryName = undefined
        this.$store.dispatch('search/getSearchData', this.newParams)
        this.$router.push({name:'search',params: this.$route.params})
      }else {
        this.newParams.keyword = undefined
        this.$store.dispatch('search/getSearchData', this.newParams)
        this.$router.push({name:'search',query: this.$route.query})
        // 全局事件总线，通知header组件，将搜索框置空
        this.$bus.$emit('clearKeyword')
      }
    },
    // 清除品牌的面包屑
    clearBrandBread() {
      this.newParams.trademark = undefined
      this.$store.dispatch('search/getSearchData', this.newParams)
      this.$router.push({name:'search',query:this.$route.query, params: this.$route.params})
    },
    // 清除属性的面包屑
    clearAttrBread(index) {
      this.newParams.props.splice(index,1)
      this.$store.dispatch('search/getSearchData', this.newParams)
      this.$router.push({name:'search',query:this.$route.query, params: this.$route.params})
    }
  },
  mounted() {
    // 通过全局事件总线，携带品牌的id和name发送dispatch
    this.$bus.$on('selectBrand',(res)=>{
      this.newParams.trademark = res
      this.$store.dispatch('search/getSearchData',this.newParams)
    })

    // 通过全局事件总线，携带详情的props发送给dispatch
    this.$bus.$on('selectAttr',(res)=>{
      this.newParams.props.push(res)
      this.$store.dispatch('search/getSearchData',this.newParams)
    })
  }
}
</script>

<style lang="less" scoped>
.bigBox {
  position: relative;
  left: 0;
  top: 0;
  height: 40px;
  span {
    position: absolute;
    left: 15px;
    top: 6px;
    font-size: 20px;
    font-weight: 700;
    color: #007aff;
  }
  .bread {
    position: absolute;
    top: 10px;
    left: 210px;
    margin-bottom: 18px;
    overflow: hidden;

    .sui-breadcrumb {
      padding: 3px 15px;
      margin: 0;
      font-weight: 400;
      border-radius: 3px;
      float: left;

      li {
        display: inline-block;
        line-height: 18px;

        a {
          color: #666;
          text-decoration: none;

          &:hover {
            color: #4cb9fc;
          }
        }
      }
    }

    .sui-tag {
      margin-top: -5px;
      list-style: none;
      font-size: 0;
      line-height: 0;
      padding: 5px 0 0;
      float: left;

      .with-x {
        font-size: 12px;
        margin: 0 5px 5px 0;
        display: inline-block;
        overflow: hidden;
        color: #000;
        background: #f7f7f7;
        padding: 0 7px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #dedede;
        white-space: nowrap;
        transition: color 400ms;
        cursor: pointer;

        i {
          margin-left: 20px;
          margin-bottom: 5px;
          cursor: pointer;
          font: 400 14px tahoma;
          display: inline-block;
          height: 100%;
          vertical-align: middle;
        }

        &:hover {
          color: #28a3ef;
        }
      }
    }
  }
}
</style>
