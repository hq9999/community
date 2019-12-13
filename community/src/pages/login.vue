<template>
  <div>
    <div class="login">
      <div class="user">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="user">
        <el-input
          placeholder="请输入账号"
          prefix-icon="el-icon-user-solid"
          v-model="user.name"
          clearable
        ></el-input>
      </div>
      <div class="user">
        <el-input
          placeholder="请输入密码"
          v-model="user.pass"
          prefix-icon="el-icon-s-cooperation"
          show-password
          clearable
        ></el-input> 
      </div>
      <el-row>
        <el-button type="primary" plain @click="tologin">登录</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import api from "../util/api";
import qs from "qs";
export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "超级管理"
        },
        {
          value: "1",
          label: "普通管理"
        }
      ],
      value: "",
      user: {
        name: "",
        pass: "",
        type: ""
      }
    };
  },
  methods: {
    tologin() {
      // console.log(this.value);
      this.user.type = this.value;
      // console.log(this.user.type);
      this.$axios({
        url: api.login,
        method: "post",
        data: qs.stringify(this.user)
      }).then(res => {
        // console.log(res);
        if(res.data.isok==true){
            localStorage.setItem("username",this.user.name)
            localStorage.setItem("isType",res.data.type)
            this.$router.push("/index")
            // console.log(this.user.name);
            
        }else{
            alert(res.data.info)
        }
      });
    }
  }
};
</script>
<style scoped>
body {
  background: #999;
}
.login {
  background: #333;
  margin: 100px auto;
  width: 400px;
  height: 300px;
  padding: 10px 20px;
}
.user {
  margin: 30px 0;
}
.el-button {
  border: none;
}
</style>