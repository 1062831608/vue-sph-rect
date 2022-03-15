<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
<!--            路由跳转登录和注册-->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
<!--        路由跳转到主页-->
        <router-link class="logo" to="/home">
          <img alt="" src="./images/logo.png">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
              id="autocomplete"
              class="input-error
              input-xxlarge"
              type="text"
              v-model.trim="keyword"
              @keyup.enter="goSearch"
          />
<!--          编程式路由导航跳转到搜索页面-->
          <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch"
          >搜索</button>
        </form>
      </div>
    </div>
  </header>

</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword:'', //搜素框关键字
    }
  },
  methods:{
    // 编程式路由导航跳转到搜索页面
    goSearch() {
      if (this.keyword === '') {
        alert('请输入关键字')
      }else {
        let location = {
          name:'search',
          params: {
            keyword: this.keyword || undefined
          }
        }
        if (this.$route.query) {
          location.query = this.$route.query
        }
        this.$router.push(location)
      }
    },
    // bread组件清除关键字后通知header组件，将keyword置空
    clearKeyword() {
      this.keyword = ''
    }
  },
  mounted() {
    // 触发清除关键字的自定义事件
    this.$bus.$on('clearKeyword',this.clearKeyword)
  },
  beforeDestroy() {
    // 清除触发清除关键字的自定义事件
    this.$bus.$off('clearKeyword')
  }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }

      }

    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
