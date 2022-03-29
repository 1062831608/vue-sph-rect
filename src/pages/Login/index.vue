<template>
  <div>
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="javascript:" style="border-right: 0;">扫描登录</a>
            </li>
            <li>
              <a href="javascript:" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form @submit.prevent="demo">

              <div class="input-text clearFix">
                <i></i>
                <input type="text" placeholder="手机号"  @change="changePhone" v-model.trim="loginInfo.phone">
                <span class="error-msg" v-show="phoneChecked">手机号格式不正确</span>
              </div>

              <div class="input-text clearFix">
                <i class="pwd"></i>
                <input :type="passwordType" placeholder="请输入密码" @blur="changePassword" v-model.trim="loginInfo.password">
                <span class="error-msg" v-show="passwordChecked">密码长度应该为8-16位，且以数字字母组成</span>
                <!--显示密码的小眼睛-->
                <span class="eye" @mousedown="showPassword" @mouseup="hidePassword">&#xe6f0;</span>
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="">
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
<!--              登录-->
              <button class="btn" @click="sendLogin">登&nbsp;&nbsp;录</button>

            </form>
            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt=""></li>
                <li><img src="./images/sina.png" alt=""></li>
                <li><img src="./images/ali.png" alt=""></li>
                <li><img src="./images/weixin.png" alt=""></li>
              </ul>
              <router-link :to="{name:'register'}"  class="register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    登录底部模块-->
    <login-and-register-footer></login-and-register-footer>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'  // lodash库中防抖的方法

export default {
  name: "Login",
  data(){
    return {
      // 用户登录的账号密码
      loginInfo:{
        phone:'',
        password:''
      },
      phoneChecked: false, // 手机号初次校验是否通过, false通过，true不通过
      passwordChecked: false,// 密码校验是否通过
      passwordType: 'password' // 控制密码显示或者隐藏
    }
  },
  methods:{
    // 校验手机号
    changePhone(e){
      let val = e.target.value
      // 手机号正则
      let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      this.phoneChecked = !reg.test(val)
    },
    // 校验密码
    changePassword() {
      // 密码的表单验证规则
      let reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/
      this.passwordChecked = !reg.test(this.loginInfo.password)
    },
    // 没用的方法，不用去管
    demo(){},
    // 鼠标按下小眼睛显示
    showPassword(){
      this.passwordType = 'text'
    },
    // 鼠标弹起隐藏密码
    hidePassword() {
      this.passwordType = 'password'
    },
    // 派发action用户登录
    sendLogin: debounce(async function () {
      {
        if(this.isAllChecked) {
         try {
           await this.$store.dispatch('user/loginUserInfo', this.loginInfo)
           // 再刷新，调取App挂载中的函数
           this.$router.go(0)
           // 跳转路由至首页
           this.$router.replace('/')
         }catch (e) {
           alert((`${e}`).substring(6))
         }
        }else {
          alert('请填写正确的登录信息信息')
        }
      }
    }, 1000,{
      leading: true
    })
  },
  computed:{
    // 表单验证是否全部通过
    isAllChecked(){
      if (this.loginInfo.phone !== '') {
        return this.phoneChecked===false&&this.passwordChecked===false
      }
      return false
    }
  }
}
</script>

<style scoped lang="less">
.login-wrap{
  height: 487px;
  background-color: #e93854;
  .login{
    width: 1200px;
    height: 487px;
    margin: 0 auto;
    background: url(./images/loginbg.png) no-repeat;
  }
  .loginform{
    width: 420px;
    height: 406px;
    box-sizing: border-box;
    background: #fff;
    float: right;
    top: 45px;
    position: relative;
    padding: 20px;
    .tab{

      li{
        width:50% ;
        float:left;
        text-align: center;
        a{
          width:100%;
          display: block;
          height:50px;
          line-height: 50px;
          font-size: 20px;
          font-weight: 700;
          color:#333;
          border: 1px solid #ddd;
          box-sizing: border-box;
          text-decoration: none;

        }
        .current{
          border-bottom:none;
          border-top-color: #28a3ef;
          color:#e1251b;
        }
      }
    }
    .content{
      width: 380px;
      height: 316px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      border-top: none;
      padding:18px;
      form{
        margin:15px 0  18px 0;
        font-size: 12px;
        line-height: 18px;
        .input-text{
          margin-bottom: 22px;
          position: relative;
          i {
            float:left;
            width: 37px;
            height: 32px;
            border:1px solid #ccc;
            background: url(~@/assets/images/icons.png) no-repeat -10px -201px;
            box-sizing: border-box;
            border-radius: 2px 0 0 2px;
          }
          .pwd{
            background-position: -72px -201px;
          }
          .eye {
            position: absolute;
            right: 15px;
            top: 5px;
            width: 20px;
            height: 20px;
            line-height: 25px;
            font-family: 'iconfont';
            font-size: 14px;
            cursor: pointer;
          }
          input{
            width:302px;
            height: 32px;
            box-sizing: border-box;
            border:1px solid #ccc;
            border-left:none;
            float:left;
            padding-top: 6px;
            padding-bottom: 6px;
            font-size: 14px;
            line-height: 22px;
            padding-right: 8px;
            padding-left: 8px;

            border-radius: 0 2px 2px 0;
            outline: none ;
          }

          .error-msg {
            position: absolute;
            top: 100%;
            left: 40px;
            color: red;
          }
        }
        .setting{
          label{
            float:left;
          }
          .forget{
            float:right;
          }
        }
        .btn{
          background-color: #e1251b;
          padding: 6px;
          border-radius: 0;
          font-size: 16px;
          font-family: 微软雅黑;
          word-spacing: 4px;
          border: 1px solid #e1251b;
          color:#fff;
          width: 100%;
          height: 36px;
          margin-top: 25px;
          outline: none;
        }
      }
      .call{
        margin-top: 30px;
        ul{
          float:left;
          li{
            float:left;
            margin-right: 5px;
          }
        }
        .register{
          float:right;
          font-size: 15px;
          line-height: 38px;
        }
        .register:hover{
          color: #4cb9fc;
          text-decoration: underline;
        }
      }

    }
  }
}
</style>
