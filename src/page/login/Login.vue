<template>
  <div class="login-wrap">
    <div class="login">
      <div class="title">推荐引擎后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" class="content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="用户名">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      param: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.login.validate(valid => {
        if (valid) {
          this.$cookie.set("role", "admin");
          this.$message.success("登录成功");
          this.$cookie.set("username", this.param.username);
          this.$router.push("/");
        } else {
          this.$message.error("请输入账号和密码");
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(90, 90, 86, 0.26)),
    url("../../assets/img/login-bg.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
}
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.4);
  overflow: hidden;
}
.title {
  width: 100%;
  line-height: 60px;
  text-align: center;
  font-size: 24px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.content {
  padding: 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
