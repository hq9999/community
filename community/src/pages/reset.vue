<template>
  <div>
    <h1>{{$route.name}}</h1>
    <div class="box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="原始密码">
          <el-input v-model="form.oldpass"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newpass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.newpass2"></el-input>
        </el-form-item>
        <el-row>
          <el-button type="primary" plain @click="reset">修改</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from "../util/api";
import qs from "qs";
export default {
  data() {
    return {
      form: {
        name: localStorage.getItem("username"),
        oldpass: "",
        newpass: "",
        newpass2: ""
      }
    };
  },
  methods: {
    reset() {
      if (this.form.newpass != this.form.newpass2) {
        this.$notify.error({
          title: "失败",
          message: "请确认密码一致"
        });
        return;
      }
      this.$axios({
        url: api.changePassManage,
        method: "post",
        data: {
          name: this.form.name,
          oldpass: this.form.oldpass,
          newpass: this.form.newpass
        }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.exit();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    exit() {
      localStorage.removeItem("isType");
      localStorage.removeItem("username");
      this.$axios({
        url: api.exit
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: "请重新登陆",
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
  width: 80%;
  margin: 50px auto;
}
</style>