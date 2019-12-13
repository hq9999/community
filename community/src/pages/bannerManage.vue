<template>
  <div>
    <h1>{{$route.name}}</h1>
    <!-- 添加 -->
    <el-row>
      <el-button type="success" class="add" icon="el-icon-edit" plain @click="addPic">添加</el-button>
    </el-row>
    <!-- table -->
    <el-table :data="tableData" style="width: 60%" height="350">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="属性" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.des }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            slot="reference"
            @click="bannerDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="添加图片地址" :label-width="formLabelWidth">
          <el-input v-model="form.img" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="添加图片描述" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addImg">确 定</el-button>
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
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        img: "",
        desc: ""
      },
      tableData: [
        {
          img: "",
          des: ""
        }
      ]
    };
  },
  methods: {
    addImg() {
      this.dialogFormVisible = false;
      this.$axios({
        url: api.addBanner,
        methods: "get",
        params: {
          img: this.form.img,
          des: this.form.des
        }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.findBanner();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    addPic() {
      this.dialogFormVisible = true;
      this.from = {
        img: "",
        desc: ""
      };
    },
    bannerDelete(index, row) {
      console.log(index, row);
      this.$axios({
        url: api.delBanner,
        method: "get",
        params: { id: row.id }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.findBanner();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    findBanner() {
      this.$axios({
        url: api.banner,
        methods: "get"
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
    }
  },
  mounted() {
    this.findBanner();
  }
};
</script>
<style scoped>
button {
  margin: 20px;
}
.el-table {
  margin: 0 auto;
}
.cell img {
  width: 100px;
}
</style>