<template>
    <div class="header">
        <div class="hd_logo">
            <img :src="logoSname.logo" />
            <span>{{logoSname.merchantName}}</span>
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../static/img/icon_close.png"> {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    },
    logoSname(state) {
      state.login.logoSrc = JSON.parse(sessionStorage.getItem("logoSrc")) || {};
      return state.login.logoSrc;
      // console.log(sessionStorage.getItem('logoSrc'));
    }
  }),
  data() {
    return {
      name: "退出"
    };
  },
  methods: {
    logout() {
      //退出接口
      this.$http
        .post(this.api + "/user/logOut", {
          id: (this.$store.state.login.token =
            JSON.parse(sessionStorage.getItem("token")) || "")
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data);
              localStorage.removeItem("ms_username");
              sessionStorage.clear();
              localStorage.clear();
              this.delCook();
              let href = location.href;
              let index = href.indexOf("#");
              let url = href.substr(0, index);
              window.location.href = url + "#/login";
              this.$store.state.login.loading = false;
              this.$router.push("/login");
              this.$Message.success(res.data.message);
            } else {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    handleCommand(command) {
      if (command == "loginout") {
        this.logout();
      }
    },
    delCook() {
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--; )
          document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  height: 50px; // font-size: 22px;
  line-height: 50px;
  color: #fff; // float: right;
  background: #2a3142;
  .logo {
    float: left;
    width: 250px;
    text-align: center;
  }
  > .hd_logo {
    float: left;
    height: 50px;
    margin-left: 196px;
    line-height: 50px;
    display: inline-flex;
    img {
      // width: 35px;
      height: 35px;
      display: inline-block;
      margin-left: 50px;
      margin-top: 8px;
      margin-right: 10px; // float: left;
    }
    div {
      height: 50px;
      float: left;
      > span:first-child {
        display: block;
        margin-top: -4px;
        margin-bottom: -32px;
        font-size: 22px;
      }
      > span:last-child {
        display: block;
        font-size: 1px;
      }
    }
  }
}

.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}

.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-logo {
  position: absolute;
  left: 20px;
  top: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
