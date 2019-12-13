<template>
  <div>
    <div class="box">
      <header>
        <div class="demo-type">
          <div>
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <span>{{name}}</span>
          </div>
        </div>
        <el-row>
          <el-button type="info" @click="exit">退出登录</el-button>
        </el-row>
      </header>
      <footer>
        <div class="left">
          <ul>
            <li>
              <el-card shadow="hover" v-if="isType=='0'">
                <router-link to="/index/manage/manageList" active-class="select">超级管理员</router-link>
              </el-card>
            </li>
            <li>
              <el-card shadow="hover" v-if="isType=='1'">
                <router-link to="/index/manage/bannerManage" active-class="select">banner管理</router-link>
              </el-card>
            </li>
            <li>
              <el-card shadow="hover" v-if="isType=='1'">
                <router-link to="/index/manage/jiajiaoM" active-class="select">家教管理</router-link>
              </el-card>
            </li>
            <li>
              <el-card shadow="hover" v-if="isType=='1'">
                <router-link to="/index/manage/shuizhanM" active-class="select">水站管理</router-link>
              </el-card>
            </li>
            <li>
              <el-card shadow="hover" v-if="isType=='1'">
                <router-link to="/index/manage/weixiuM" active-class="select">维修管理</router-link>
              </el-card>
            </li>
            <li>
              <el-card shadow="hover" v-if="isType=='1'">
                <router-link to="/index/manage/jiazhengM" active-class="select">家政管理</router-link>
              </el-card>
            </li>
            <li>
              <el-card shadow="hover" v-if="isType=='1'">
                <router-link to="/index/manage/reset" active-class="select">修改密码</router-link>
              </el-card>
            </li>
          </ul>
        </div>
        <div class="right">
          <router-view></router-view>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import api from "../util/api";
import qs from "qs";
export default {
  data() {
    return {
      name: "",
      isType: localStorage.getItem("isType")
    };
  },
  mounted() {
    this.name = localStorage.getItem("username");
    // console.log(this.name);
  },
  methods: {
    exit() {
      localStorage.removeItem("isType");
      localStorage.removeItem("username");
      this.$axios({
        url: api.exit
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.$router.replace("/login");
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    }
  }
};
</script>
<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* background: pink; */
}
header {
  height: 100px;
  background: #409eff;
  padding-left: 10px;
}
footer {
  flex: 1;
  display: flex;
}
.left {
  width: 200px;
  background: #049ee0;
}
span {
  vertical-align: middle;
  margin-right: 10px;
}
button {
  margin-top: 8px;
}
.left ul li {
  margin: 20px 0;
}
.right {
  flex: 1;
}
.el-card {
  background: #40c6ff;
  text-align: center;
  border: none;
}
.select {
  color: #f56c6c;
}
</style>