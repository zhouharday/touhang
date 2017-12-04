<template>
  <div class="login-wrap">
    <div>
      <div class="login-entangle">
        <p class="login-left">Lead Investor</p>
        <p class="login-center">Financial investment</p>
        <div class="login-bottom">
          <span class="left-fir">高效</span>
          <span class="left-dot"></span>
          <span class="left-sec">信任</span>
          <span class="right-dot"></span>
          <span class="left-thi">依赖</span>
        </div>
      </div>
      <div class="login-box">
        <component :is="CardBox" @goBack="goBack" @checkVata="checkVataa" @changePassword="getPwd" @changeName="getName" @sendVal="getval" @keyup.enter.native="submitForm($event)">
        </component>
        <div class="login_btn">
          <button type="button" :loading="loading" class="login-btn" ondbclick="dbClick" @click="submitForm" :class="{ active : valueData }">登 录</button>
        </div>
        <hr class="hr" />
        <!-- <div class="login-right-bottom">
          <p>
            <img src="/static/img/联系我们.png">
          </p>
          <p>
            <img src="/static/img/关于我们.png">
          </p>
          <p>
            <img src="/static/img/App下载.png">
          </p>
        </div>
        <div class="login-footer">
          <p>联系我们</p>
          <p>关于我们</p>
          <p>APP下载</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { trimStr } from "common/js/config";
export default {
  // watch:{
  //     router(to,form){
  //         // console.log(to);
  //     }
  // },
  created() {
    // console.log(this.isLogged);
    //     this.$Message.config({
    //     top: 10,
    //     duration: 3
    // });
    //     this.$Message.info('请使用 Google 浏览器，体验更佳哦~~');
  },
  mounted() {},
  computed: {
    ...mapState({
      CardBox: state => state.login.CardBox,
      merchant: state => state.login.merchants,
      loading: state => state.login.loading
    })
  },
  data() {
    return {
      userName: "",
      passWord: "",
      valueData: false,
      loginImg: [
        { logo: "../static/img/2.png", merchant_name: "阿里巴巴1" }
        // { logo: "../static/img/2.png", merchant_name: "腾讯企业2" },
        // { logo: "../static/img/2.png", merchant_name: "百度搜索3" },
        // { logo: "../static/img/2.png", merchant_name: "深度网络4" },
        // { logo: "../static/img/2.png", merchant_name: "大唐电信5" },
        // { logo: "../static/img/2.png", merchant_name: "中国移动6" },
      ]
    };
  },
  methods: {
    dbClick() {
      return false;
    },
    getName(val) {
      this.userName = val;
    },
    getPwd(val) {
      this.passWord = val;
    },
    getval(val) {
      if (val) {
        this.valueData = true;
      } else {
        this.valueData = false;
      }
    },
    submitForm(e) {
      if (this.valueData) {
        e.preventDefault();
        this.$store.state.login.loading = true;
        sessionStorage.clear();
        // this.$router.push({ name: 'homeContent' });

        let number = trimStr(this.userName);
        let pass = trimStr(this.passWord);
        pass = this.md5(pass, 32);
        // window.setCookie("name",number);
        // window.setCookie("pwd",pass);
        // console.log(pass);
        // this.userName = "";
        // this.passWord = "";
        this.valueData = false;
        this.$store.dispatch({
          type: "loginAPI",
          name: number,
          pwd: pass,
          self: this
        });
        // console.log(pass);
      }
    },
    goBack($event) {
      this.$store.commit("changeLoginCard");
    }
  }
};
</script>

<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
}

.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(/static/img/bg.png) no-repeat center center;
  > div {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100%;
  }
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}

.login-left {
  font-size: 50px;
  color: #fff;
  font-family: ITC Avant Garda Gothic Demi Regular;
}

.login-center {
  font-size: 40px;
  color: #afacae;
}

span {
  color: #aca7a7;
}

.left-fir {
  top: 800px;
}

.login-entangle {
  width: 35%;
  position: absolute;
  top: 30%;
  left: 20%;
}

.login-bottom {
  font-size: 28px;
  margin-top: 42px;
}

.left-sec {
  margin-left: 30px;
}

.left-thi {
  margin-left: 30px;
}

.left-dot,
.right-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #aca7a7;
  display: inline-block;
  margin-left: 20px;
  margin-bottom: 5px;
}

.ms-login {
  margin-left: 10px;
  margin-top: 48px;
}

input::-webkit-input-placeholder {
  color: #a6a9ad;
}

.login-box {
  // width: 35%;
  text-align: center;
  position: absolute;
  top: 30%;
  left: 55%;
  border-left: solid 2px #a6a9ad;
}

.login-name {
  // width: 382px;
  font-size: 24px;
  color: #fff;
  font-family: "微软雅黑";
  margin-bottom: 24px;
  margin-left: 82px;
}

.login-account {
  width: 382px;
  height: 84px;
  // background: transparent;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  outline: none;
  // color: #fff;
}

.login-ac,
.login-pass {
  // width: 330px;
  height: 84px;
  padding-left: 48px;
  border-bottom: solid 2px #a6a9ad;
  margin-left: 10%;
  /*margin-bottom: 16px;*/
}

.login-ac {
  background: url(/static/img/账号.png) no-repeat left center;
}

.login-pass {
  background: url(/static/img/密码.png) no-repeat left center;
  margin-bottom: 16px;
}

.find-pass {
  // width: 382px;
  font-size: 16px;
  margin-bottom: 64px;
  margin-left: 48px;
  /*clear: both;*/
}

.pass-find {
  color: #fff;
  float: left;
}

.pass-zhuce {
  color: #fff;
  float: right;
}

.login-btn {
  width: 382px;
  height: 54px;
  font-size: 24px;
  border-radius: 30px;
  margin-left: 82px;
  background: #f05e5e;
  border: none;
  margin-bottom: 64px;
  color: #fff;
  margin-top: 4px;
  outline: none;
  &:hover {
    background: #803f3f;
  }
  &:active {
    background: #f05e5e;
  }
}

.login-right-bottom {
  width: 382px;
  margin-left: 82px;
  display: flex;
  justify-content: space-between;
}

.login-right-bottom p {
  width: 33.33%;
  float: left;
}

.login-footer {
  margin-left: 82px;
}

.login-footer p {
  width: 33.33%;
  float: left;
  color: #fff;
  font-size: 12px;
}

.hr {
  width: 382px;
  border: solid 1px #a6a9ad;
  margin-left: 82px;
  margin-bottom: 16px;
}

.active {
  background: red;
}

.loginCard {
  margin-left: 78px;
  position: relative;
  .loginCard_title {
    // position: absolute;
    color: #ffffff;
    margin-top: 246px;
  }
  > div:nth-child(1) {
    color: #fff;
    position: absolute;
    top: -40px;
    left: 67px;
    font-size: 20px;
    font-weight: bolder;
  }
  > div:nth-child(2) {
    padding-bottom: 40px;
    overflow: hidden;
    > div {
      overflow: auto;
    }
  }
  > div:nth-child(3) {
    color: #ffffff;
    position: absolute;
    right: 0;
    top: 400px;
  }
}

.login_btn {
  margin-top: 65px;
}

.el-carousel__item {
  // margin: 0 auto;
  // margin-left: 82px;
  overflow: visible;
  h3 {
    // position: relative;
    color: #475669;
    font-size: 14px; // opacity: 0.75;
    line-height: 200px;
    background: #ffffff;
    margin: 0;
    > img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 112px;
      height: 112px;
    }
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
