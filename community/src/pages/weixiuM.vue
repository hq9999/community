<template>
  <div>
    <h1>{{$route.name}}</h1>
    <div class="jia">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="维修" name="first">
          <!-- 添加 -->
          <el-row>
            <el-button
              type="success"
              class="add"
              icon="el-icon-edit"
              plain
              style="margin: 20px 0;"
              @click="addWB"
            >添加</el-button>
          </el-row>
          <!-- table -->
          <el-table :data="tableData" style="width: 100%" height="350">
            <el-table-column label="序号">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="水站名称">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="电话">
              <template slot-scope="scope">
                <span>{{ scope.row.tel }}</span>
              </template>
            </el-table-column>
            <el-table-column label="价格">
              <template slot-scope="scope">
                <span>{{ scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  slot="reference"
                  @click="bannerDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 添加弹出框 -->
          <el-dialog title="添加" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules">
              <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" placeholder="名称" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="评分" :label-width="formLabelWidth" prop="score">
                <el-input v-model="form.score" placeholder="0~5之间" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
                <el-input v-model="form.type" placeholder="维修类型" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="点赞人数" :label-width="formLabelWidth" prop="likeNum">
                <el-input v-model.number="form.likeNum" placeholder="点赞数量" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="关注人数" :label-width="formLabelWidth" prop="readNum">
                <el-input v-model.number="form.readNum" placeholder="关注人数" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="商家地址" :label-width="formLabelWidth" prop="address">
                <el-input v-model="form.address" placeholder="商家地址" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="商家信息" :label-width="formLabelWidth" prop="info">
                <el-input v-model="form.info" placeholder="商家信息"  autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="距离" :label-width="formLabelWidth" prop="len">
                <el-input v-model.number="form.len" placeholder="eg:4.2km" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
                <el-input v-model.number="form.tel" placeholder="eg:400-100-1000" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addW" v-if="isShow">确 定</el-button>
              <el-button type="primary" @click="addUpd" v-else>修 改</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>

        <el-tab-pane label="维修评论" name="second">
          <!-- 检索 -->
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
              <el-select v-model="value">
                <el-option label="全部" value @click.native="findC"></el-option>
                <el-option
                  v-for="item in tableData"
                  :label="item.name"
                  :key="item.id"
                  :value="item.id"
                  @click.native="findWid(item.id)"
                ></el-option>
              </el-select>
              <!-- {{tableData.region}} -->
            </el-form-item>
            <!-- 表格 -->
            <el-table :data="comment" style="width: 100%" height="350">
              <el-table-column label="序号">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="用户名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="评论内容">
                <template slot-scope="scope">
                  <span>{{ scope.row.content }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.time|timeFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    slot="reference"
                    @click="comDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import api from "../util/api";
import qs from "qs";
export default {
  data() {
    var cNull = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此项不能为空"));
      }
    };
    var cNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此项不能为空"));
      } else if (!Number.isInteger(value)) {
        return callback(new Error("请输入数字值"));
      }
    };
    var cScore = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("评分不能为空"));
      } else if (!Number(value)) {
        // !Number.isInteger(value)
        return callback(new Error("请输入数字值"));
      } else if (value > 5 || value < 0) {
        return callback(new Error("0-5之间的数字"));
      }
    };
    var cLen = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此项不能为空"));
      } else if (!Number(value)) {
        return callback(new Error("请输入数字值"));
      }else if(!value>0){
        return callback(new Error("大于0的数字"));
      }
    };
    var cTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此项不能为空"));
      } else if (!Number.isInteger(value)) {
        return callback(new Error("请输入数字值"));
      }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))){
        return callback(new Error("手机号码有误，请重填"));
      }
    };
    return {
      rules: {
        name: [{ required: true, validator: cNull, trigger: "blur" }],
        type: [{ required: true, validator: cNull, trigger: "blur" }],
        address: [{ required: true, validator: cNull, trigger: "blur" }],
        info: [{ required: true, validator: cNull, trigger: "blur" }],
        score: [{ required: true, validator: cScore, trigger: "blur" }],
        likeNum: [{ required: true, validator: cNumber, trigger: "blur" }],
        readNum: [{ required: true, validator: cNumber, trigger: "blur" }],
        len: [{ required: true, validator: cLen, trigger: "blur" }],
        tel: [{ required: true, validator: cTel, trigger: "blur" }],
      },
      value: "",
      isShow: true,
      activeName: "first",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: "",
        score: "",
        type: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        tel: "",
        info: ""
      },
      tableData: [
        {
          name: "",
          score: "",
          type: "",
          likeNum: "",
          readNum: "",
          address: "",
          len: "",
          tel: "",
          info: ""
        }
      ],
      comment: [
        {
          name: "",
          waterId: "",
          content: "",
          time: ""
        }
      ]
    };
  },
  methods: {
    findWid(id) {
      console.log(id);

      this.$axios({
        url: api.findRepairComment,
        methods: "get",
        params: {
          repairId: id,
        }
      }).then(res => {
        if (res.data.isok == true) {
          this.comment = res.data.data;
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
    addUpd() {
      this.$axios({
        url: api.updateRepair,
        method: "get",
        params: {
          id: this.form.id,
          name: this.form.name,
          score: this.form.score,
          type: this.form.type,
          likeNum: this.form.likeNum,
          readNum: this.form.readNum,
          address: this.form.address,
          len: this.form.len,
          tel: this.form.tel,
          info: this.form.info
        }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.findW();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
      this.dialogFormVisible = false;
    },
    addWB() {
      this.isShow = true;
      this.dialogFormVisible = true;
      this.form = {
         name: "",
        score: "",
        type: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        tel: "",
        info: ""
      };
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleEdit(index, row) {
      this.isShow = false;
      this.dialogFormVisible = true;
      this.$axios({
        url: api.findRepair,
        method: "get",
        params: { id: row.id }
      }).then(res => {
        if (res.data.isok == true) {
          this.form = res.data.data[0];
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
    bannerDelete(index, row) {
      this.$axios({
        url: api.delRepair,
        method: "get",
        params: { id: row.id }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.findW();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    findW() {
      this.$axios({
        url: api.findRepair,
        methods: "get",
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
    addW() {
      this.dialogFormVisible = false;
      this.$axios({
        url: api.addRepair,
        methods: "get",
        params: {
          name: this.form.name,
          score: this.form.score,
          type: this.form.type,
          likeNum: this.form.likeNum,
          readNum: this.form.readNum,
          address: this.form.address,
          len: this.form.len,
          tel: this.form.tel,
          info: this.form.info
        }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.findW();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    findC() {
      this.$axios({
        url: api.findRepairComment,
        methods: "get"
      }).then(res => {
        if (res.data.isok == true) {
          this.comment = res.data.data;
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
    comDelete(index, row) {
      this.$axios({
        url: api.delRepairComment,
        method: "get",
        params: { id: row.id }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.findWid(row.repairId);
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
    this.findW();
    this.findC();
  }
};
</script>
<style scoped>
.jia {
  width: 80%;
  margin: 0px auto;
}
.el-select {
  width: 550px;
  margin-left: 90px;
}
</style>