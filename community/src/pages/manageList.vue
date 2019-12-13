<template>
  <div>
      <h1>{{$route.name}}</h1>
    <el-row>
      <el-button type="success" class="add" icon="el-icon-edit" plain @click="addM">添加</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 80%" height="350">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>属性: {{ scope.row.des }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="属性" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.des }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time|timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加|修改管理员" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" :disabled="isD"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.pass" autocomplete="off" :disabled="isD"></el-input>
        </el-form-item>
        <el-form-item label="属性" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;">取 消</el-button>
        <el-button type="primary" @click="add" v-if="isA">添加</el-button>
        <el-button type="primary" @click="update()" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "../util/api";
import qs from "qs";
export default {
  data() {
    return {
      isA: true,
      isD: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        name: "",
        des: "",
        pass: "",
        time: ""
      },
      tableData: [
        {
          time: "",
          name: "",
          pass: "",
          des: ""
        }
      ]
    };
  },
  mounted() {
    this.find();
  },
  methods: {
    addM() {
      this.dialogFormVisible = true;
      this.isD = false;
      this.isA = true;
      this.form = {
        name: "",
        des: "",
        pass: "",
        time: ""
      };
    },
    find() {
      this.$axios({
        url: api.findManage,
        method: "post"
      }).then(res => {
        if (res.data.isok == true) {
          this.tableData = res.data.data;
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    add() {
      this.dialogFormVisible = false;
      this.$axios({
        url: api.addManage,
        method: "post",
        data: {
          name: this.form.name,
          pass: this.form.pass,
          time: this.form.time.getTime(),
          des: this.form.des
        }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.find();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    update() {
      this.dialogFormVisible = false;
      this.$axios({
        url: api.updateManage,
        method: "post",
        data: this.$qs.stringify({
          id: this.form.id,
          time: this.form.time.getTime(),
          des: this.form.des
        })
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.find();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.isD = true;
      this.isA = false;
      this.dialogFormVisible = true;
      this.$axios({
        url: api.findManage,
        method: "post",
        data: { id: row.id }
      }).then(res => {
        if (res.data.isok == true) {
          this.form = res.data.data[0];
          this.form.time = new Date(Number(this.form.time));
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$axios({
        url: api.delManage,
        method: "post",
        data: { id: row.id }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.find();
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
.el-table{
    margin: 0 auto;
}
.add {
  margin: 20px;
}
</style>