<template>
  <div class="header">
    <div class="logo">推荐引擎管理系统</div>
    <div class="admin-info">
      <div class="icon-wrap">
        <i class="el-icon-message-solid icon"></i>
      </div>
      <div class="icon-wrap">
        <i class="el-icon-s-custom icon"></i>
      </div>
      <!-- <div class="icon-wrap">
        <i class="el-icon-arrow-down icon"></i>
      </div>-->
      <el-dropdown szie="small">
        <span class="icon-wrap">
          <i class="el-icon-arrow-down icon"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账户信息</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  }
};
</script>

<style scoped>
.header {
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #242f42;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.logo {
  font-size: 19px;
  font-weight: 550;
  color: #eee;
  letter-spacing: 2px;
}
.admin-info .icon-wrap {
  display: inline-block;
  font-size: 19px;
  cursor: pointer;
}
.admin-info .icon {
  margin-right: 15px;
  color: #eee;
}
</style>