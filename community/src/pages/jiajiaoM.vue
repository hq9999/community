<template>
  <div>
    <h1>{{$route.name}}</h1>

    <!-- table -->
    <div class="jia">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="家教banner" name="first">
          <!-- 添加 -->
          <el-row>
            <el-button
              type="success"
              class="add"
              icon="el-icon-edit"
              plain
              style="margin: 20px 0;"
              @click="addBB"
            >添加</el-button>
          </el-row>
          <!-- table -->
          <el-table :data="tableData" style="width: 100%" height="350">
            <el-table-column label="序号">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.img" alt />
              </template>
            </el-table-column>
            <el-table-column label="描述">
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
          <!-- 添加弹出框 -->
          <el-dialog title="添加" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules">
              <el-form-item label="添加图片地址" :label-width="formLabelWidth" prop="img">
                <el-input v-model="form.img" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="添加图片描述" :label-width="formLabelWidth" prop="des">
                <el-input v-model="form.des" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addB">确 定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>

        <el-tab-pane label="家教类型" name="second">
          <!-- 添加 -->
          <el-row>
            <el-button
              type="success"
              class="add"
              icon="el-icon-edit"
              plain
              style="margin: 20px 0;"
              @click="addBB2"
            >添加</el-button>
          </el-row>
          <!-- table -->
          <el-table :data="tableData2" style="width: 100%" height="350">
            <el-table-column label="序号">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.img" alt />
              </template>
            </el-table-column>
            <el-table-column label="描述">
              <template slot-scope="scope">
                <span>{{ scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  slot="reference"
                  @click="bannerDelete2(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 添加弹出框 -->
          <el-dialog title="添加" :visible.sync="dialogFormVisible2">
            <el-form :model="form2" :rules="rules">
              <el-form-item label="添加图片地址" :label-width="formLabelWidth" prop="img">
                <el-input v-model="form2.img" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="添加图片描述" :label-width="formLabelWidth" prop="img">
                <el-input v-model="form2.type" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="addB2">确 定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>

        <el-tab-pane label="家教排行" name="third">
          <!-- 添加 -->
          <el-row>
            <el-button
              type="success"
              class="add"
              icon="el-icon-edit"
              plain
              style="margin: 20px 0;"
              @click="addBB3"
            >添加</el-button>
          </el-row>
          <!-- table -->
          <el-table :data="tableData3" style="width: 100%" height="350">
            <el-table-column label="序号">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.img" alt />
              </template>
            </el-table-column>
            <el-table-column label="报名人数">
              <template slot-scope="scope">
                <span>{{scope.row.num}}</span>
              </template>
            </el-table-column>
            <el-table-column label="机构图片">
              <template slot-scope="scope">
                <img :src="scope.row.teacherImg" alt />
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  slot="reference"
                  @click="bannerDelete3(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 添加弹出框 -->
          <el-dialog title="添加" :visible.sync="dialogFormVisible3">
            <el-form :model="form3" :rules="rules">
              <el-form-item label="图片地址" :label-width="formLabelWidth" prop="img">
                <el-input v-model="form3.img" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="报名人数" :label-width="formLabelWidth" prop="num">
                <el-input v-model.number="form3.num" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="机构图片地址" :label-width="formLabelWidth" prop="img">
                <el-input v-model="form3.teacherImg" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="addB3">确 定</el-button>
            </div>
          </el-dialog>
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
      } else if (!value > 0) {
        return callback(new Error("大于0的数字"));
      }
    };
    return {
      rules: {
        des: [{ required: true, validator: cNull, trigger: "blur" }],
        img: [{ required: true, validator: cNull, trigger: "blur" }],
        num: [{ required: true, validator: cNumber, trigger: "blur" }]
      },
      activeName: "first",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form: {
        img: "",
        des: ""
      },
      form2: {
        img: "",
        type: ""
      },
      form3: {
        img: "",
        num: "",
        teacherImg: ""
      },
      tableData: [
        {
          img: "",
          des: ""
        }
      ],
      tableData2: [
        {
          img: "",
          type: ""
        }
      ],
      tableData3: [
        {
          img: "",
          num: "",
          teacherImg: ""
        }
      ]
    };
  },
  methods: {
    addBB() {
      this.dialogFormVisible = true;
      this.form = {
        img: "",
        des: ""
      };
    },
    addBB2() {
      this.dialogFormVisible2 = true;
      this.form2 = {
        img: "",
        type: ""
      };
    },
    addBB3() {
      this.dialogFormVisible3 = true;
      this.form3 = {
        img: "",
        num: "",
        teacherImg: ""
      };
    },
    findBanner() {
      this.$axios({
        url: api.teacherBanner,
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
    },
    addB() {
      this.dialogFormVisible = false;
      this.$axios({
        url: api.addTeacherBanner,
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
    bannerDelete(index, row) {
      console.log(index, row);
      this.$axios({
        url: api.delTeacherBanner,
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    findBanner2() {
      this.$axios({
        url: api.teacherType,
        methods: "get"
      }).then(res => {
        if (res.data.isok == true) {
          this.tableData2 = res.data.data;
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
    addB2() {
      this.dialogFormVisible2 = false;
      this.$axios({
        url: api.addTeacherType,
        methods: "get",
        params: {
          img: this.form2.img,
          type: this.form2.type
        }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.findBanner2();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    bannerDelete2(index, row) {
      console.log(index, row);
      this.$axios({
        url: api.delTeacherType,
        method: "get",
        params: { id: row.id }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.findBanner2();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    findBanner3() {
      this.$axios({
        url: api.teacherTop,
        methods: "get"
      }).then(res => {
        if (res.data.isok == true) {
          this.tableData3 = res.data.data;
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
    addB3() {
      this.dialogFormVisible3 = false;
      this.$axios({
        url: api.addTeacherTop,
        methods: "get",
        params: {
          img: this.form3.img,
          num: this.form3.num,
          teacherImg: this.form3.teacherImg
        }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.findBanner3();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    bannerDelete3(index, row) {
      console.log(index, row);
      this.$axios({
        url: api.delTeacherTop,
        method: "get",
        params: { id: row.id }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.findBanner3();
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
    this.findBanner2();
    this.findBanner3();
  }
};
</script>
<style scoped>
.jia {
  width: 80%;
  margin: 0px auto;
}
.cell img {
  width: 100px;
}
</style>