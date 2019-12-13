<template>
  <div>
    <h1>{{$route.name}}</h1>
    <div class="jia">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="家政banner" name="first">
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
            <el-table-column label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.img" alt />
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
            <el-form :model="form">
              <el-form-item
                label="图片"
                :label-width="formLabelWidth"
                prop="img"
                :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                 ]"
              >
                <el-input v-model="form.img" placeholder="图片地址" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addW" v-if="isShow">确 定</el-button>
              <el-button type="primary" @click="addUp" v-else>修 改</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>

        <el-tab-pane label="人员管理" name="second">
          <!-- 添加 -->
          <el-row>
            <el-button
              type="success"
              class="add"
              icon="el-icon-edit"
              plain
              style="margin: 20px 0;"
              @click="addPa"
            >添加</el-button>
          </el-row>
          <!-- 添加弹出框 -->
          <el-dialog title="添加" :visible.sync="dialogFormVisible2">
            <el-form :model="pform" :rules="rules">
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                <el-input v-model="pform.name" placeholder="名称" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="年龄" :label-width="formLabelWidth " prop="age">
                <el-input v-model.number="pform.age" placeholder="0~100之间" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
                <el-input
                  v-model.number="pform.tel"
                  placeholder="eg:15222222222"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="资格认证" :label-width="formLabelWidth" prop="qualification">
                <el-checkbox-group v-model="pform.qualification">
                  <el-checkbox
                    v-for="item in qualification"
                    :label="item"
                    :key="item"
                    name="qualification"
                  ></el-checkbox>
                </el-checkbox-group>
                <!-- {{pform.qualification}} -->
              </el-form-item>
              <el-form-item label="服务项目" :label-width="formLabelWidth" prop="type">
                <el-checkbox-group v-model="pform.type">
                  <el-checkbox v-for="item in type" :label="item" :key="item" name="type"></el-checkbox>
                </el-checkbox-group>
                <!-- {{pform.type}} -->
              </el-form-item>
              <el-form-item label="学历" :label-width="formLabelWidth" prop="edu">
                <el-select v-model="pform.edu" placeholder="请选择学历">
                  <el-option label="小学" value="小学"></el-option>
                  <el-option label="初中" value="初中"></el-option>
                  <el-option label="高中" value="高中"></el-option>
                  <el-option label="本科" value="本科"></el-option>
                  <el-option label="研究生" value="研究生"></el-option>
                  <el-option label="博士" value="博士"></el-option>
                </el-select>
                <!-- {{pform.edu}} -->
              </el-form-item>
              <el-form-item label="工作年限" :label-width="formLabelWidth" prop="year">
                <el-input v-model.number="pform.year" placeholder="工作年限" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="级别" :label-width="formLabelWidth" prop="vNum">
                <el-input v-model="pform.vNum" placeholder="eg:v3" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
                <el-input v-model.number="pform.price" placeholder="eg:30元/小时" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
                <el-input v-model="pform.city" placeholder="eg:武汉" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="经验" :label-width="formLabelWidth" prop="experience">
                <el-input v-model="pform.experience" placeholder="eg:3年" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="点赞数量" :label-width="formLabelWidth" prop="likeNum">
                <el-input v-model.number="pform.likeNum" placeholder="点赞数量" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="关注人数" :label-width="formLabelWidth" prop="readNum">
                <el-input v-model.number="pform.readNum" placeholder="关注人数" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="距离" :label-width="formLabelWidth" prop="len">
                <el-input v-model.number="pform.len" placeholder="eg:4.2km" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="自我评价" :label-width="formLabelWidth" prop="info">
                <el-input v-model="pform.info" placeholder="eg:人见人爱,花见花开..." autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="免冠照片" :label-width="formLabelWidth" prop="img">
                <el-input v-model="pform.img" placeholder="图片路径" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="addP" v-if="isShow">添 加</el-button>
              <el-button type="primary" @click="addUp" v-else>修 改</el-button>
            </div>
          </el-dialog>
          <!-- 检索 -->
          <el-form ref="form" :model="form">
            <el-form-item>
              <el-select v-model="value">
                <el-option label="全部" value @click.native="findP"></el-option>
                <el-option
                  v-for="item in type"
                  :label="item"
                  :key="item"
                  :value="item"
                  @click.native="findItem(item)"
                ></el-option>
              </el-select>
              {{people.region}}
            </el-form-item>
            <el-table :data="people" style="width: 100%" height="250">
              <el-table-column label="序号">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="名称">
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
                  <span>{{ scope.row.price}}</span>
                </template>
              </el-table-column>
              <el-table-column label="年龄">
                <template slot-scope="scope">
                  <span>{{ scope.row.age}}</span>
                </template>
              </el-table-column>
              <el-table-column label="学历">
                <template slot-scope="scope">
                  <span>{{ scope.row.edu}}</span>
                </template>
              </el-table-column>
              <el-table-column label="服务类型">
                <template slot-scope="scope">
                  <span>{{ scope.row.type}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
      } else if (!value > 0) {
        return callback(new Error("大于0的数字"));
      }
    };
    var cAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此项不能为空"));
      } else if (!Number(value)) {
        return callback(new Error("请输入数字值"));
      } else if (!(value > 0 && value < 200)) {
        return callback(new Error("大于0小于200的数字"));
      }
    };
    var cTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此项不能为空"));
      } else if (!Number.isInteger(value)) {
        return callback(new Error("请输入数字值"));
      } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
        return callback(new Error("手机号码有误，请重填"));
      }
    };
    return {
      rules: {
        name: [{ required: true, validator: cNull, trigger: "blur" }],
        img: [{ required: true, validator: cNull, trigger: "blur" }],
        info: [{ required: true, validator: cNull, trigger: "blur" }],
        edu: [{ required: true, validator: cNull, trigger: "blur" }],
        city: [{ required: true, validator: cNull, trigger: "blur" }],
        experience: [{ required: true, validator: cNull, trigger: "blur" }],
        year: [{ required: true, validator: cNumber, trigger: "blur" }],
        vNum: [{ required: true, validator: cNull, trigger: "blur" }],
        likeNum: [{ required: true, validator: cNumber, trigger: "blur" }],
        readNum: [{ required: true, validator: cNumber, trigger: "blur" }],
        len: [{ required: true, validator: cLen, trigger: "blur" }],
        age: [{ required: true, validator: cAge, trigger: "blur" }],
        tel: [{ required: true, validator: cTel, trigger: "blur" }],
        price: [{ required: true, validator: cNumber, trigger: "blur" }],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        qualification: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ]
      },
      value: "",
      isShow: true,
      activeName: "first",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        img: ""
      },
      tableData: [
        {
          img: ""
        }
      ],
      people: [
        {
          name: "",
          img: "",
          age: "",
          edu: "",
          year: "",
          vNum: "",
          price: "",
          city: "",
          experience: "",
          readNum: "",
          likeNum: "",
          len: "",
          tel: "",
          info: "",
          qualification: [],
          type: []
        }
      ],
      pform: {
        name: "",
        img: "",
        age: "",
        edu: "",
        year: "",
        vNum: "",
        price: "",
        city: "",
        experience: "",
        readNum: "",
        likeNum: "",
        len: "",
        tel: "",
        info: "",
        qualification: [],
        type: []
      },
      qualification: [],
      type: []
    };
  },
  methods: {
    addWB() {
      this.dialogFormVisible = true;
      this.form = {
        img: ""
      };
    },
    addPa() {
      this.isShow = true;
      this.dialogFormVisible2 = true;
      this.pform = {
        name: "",
        img: "",
        age: "",
        edu: "小学",
        year: "",
        vNum: "",
        price: "",
        city: "",
        experience: "",
        readNum: "",
        likeNum: "",
        len: "",
        tel: "",
        info: "",
        qualification: [],
        type: []
      };
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    bannerDelete(index, row) {
      this.$axios({
        url: api.delHomeBanner,
        method: "get",
        params: { id: row.id }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.findH();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    findH() {
      this.$axios({
        url: api.homeBanner,
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
    addW() {
      this.dialogFormVisible = false;
      this.$axios({
        url: api.addHomeBanner,
        methods: "get",
        params: {
          img: this.form.img
        }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.findH();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },

    findP() {
      this.$axios({
        url: api.findHomeWorker,
        methods: "get"
      }).then(res => {
        if (res.data.isok == true) {
          var arr = res.data.data;
          for (let i = 0; i < arr.length; i++) {
            console.log(arr[i].type);
            if (arr[i].type.includes("[")) {
              arr[i].type = JSON.parse(arr[i].type);
            } else {
              arr[i].type = arr[i].type.split(",");
            }
            arr[i].type = arr[i].type.join(",");
          }
          //   console.log(arr[0].type);
          this.people = res.data.data;
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
    comDelete(i, row) {
      this.$axios({
        url: api.delHomeWorker,
        method: "get",
        params: { id: row.id }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.value = "";
          this.findP();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    addP() {
      this.dialogFormVisible2 = false;
      this.$axios({
        url: api.addHomeWorker,
        methods: "get",
        params: {
          name: this.pform.name,
          img: this.pform.img,
          age: this.pform.age,
          edu: this.pform.edu,
          year: this.pform.year,
          vNum: this.pform.vNum,
          price: this.pform.price,
          city: this.pform.city,
          experience: this.pform.experience,
          readNum: this.pform.readNum,
          likeNum: this.pform.likeNum,
          len: this.pform.len,
          tel: this.pform.tel,
          info: this.pform.info,
          qualification: this.pform.qualification,
          type: this.pform.type
        }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.value = "";
          this.findP();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
    },
    handleEdit(i, row) {
      console.log(row);
      this.isShow = false;
      this.dialogFormVisible2 = true;
      this.$axios({
        url: api.findHomeWorker,
        method: "get",
        params: { id: row.id }
      }).then(res => {
        if (res.data.isok == true) {
          var arr = res.data.data[0];
          if (arr.qualification.includes("[")) {
            arr.qualification = JSON.parse(arr.qualification);
          } else {
            arr.qualification = arr.qualification.split(",");
          }

          if (arr.type.includes("[")) {
            arr.type = JSON.parse(arr.type);
          } else {
            arr.type = arr.type.split(",");
          }
          this.pform = arr;
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
    addUp() {
      this.$axios({
        url: api.updateHomeWorker,
        method: "get",
        params: {
          id: this.pform.id,
          name: this.pform.name,
          img: this.pform.img,
          age: this.pform.age,
          edu: this.pform.edu,
          year: this.pform.year,
          vNum: this.pform.vNum,
          price: this.pform.price,
          city: this.pform.city,
          experience: this.pform.experience,
          readNum: this.pform.readNum,
          likeNum: this.pform.likeNum,
          len: this.pform.len,
          tel: this.pform.tel,
          info: this.pform.info,
          qualification: this.pform.qualification,
          type: this.pform.type
        }
      }).then(res => {
        if (res.data.isok == true) {
          this.$notify({
            title: "成功",
            message: res.data.info,
            type: "success"
          });
          this.value = "";
          this.findP();
          return;
        }
        this.$notify.error({
          title: "失败",
          message: res.data.info
        });
      });
      this.dialogFormVisible2 = false;
    },
    findItem(i) {
      // console.log(i);
      this.$axios({
        url: api.findHomeWorker,
        methods: "get",
        params: {
          type: i
        }
      }).then(res => {
        if (res.data.isok == true) {
          this.people = res.data.data;
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
    this.findH();
    this.findP();
    this.$axios({
      url: api.getQualification,
      method: "get"
    }).then(res => {
      this.qualification = res.data.qualification;
    });
    this.$axios({
      url: api.getHomeType,
      method: "get"
    }).then(res => {
      this.type = res.data.type;
    });
  }
};
</script>
<style scoped>
.jia {
  width: 80%;
  margin: 0px auto;
}
.el-select {
  width: 515px;
}
.cell img {
  width: 100px;
}
</style>