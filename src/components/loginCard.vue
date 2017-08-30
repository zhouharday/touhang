<template>
    <div>
        <div class="login-name">企业登录</div>
        <div class="login-ac">
            <input type="text" class="login-account" placeholder="请输入账号/手机号" required>
        </div>
        <div class="login-pass">
            <input type="password" class="login-account" placeholder="请输入密码" required>
        </div>
        <div class="find-pass">
            <!-- <router-link to=""></router-link> -->
            <router-link v-if="pass" class="pass-zhuce" to="/register">企业注册</router-link>
            <a href="#" class="pass-find">找回密码</a>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
