<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-data-analysis icon"></i>首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>策略管理</el-breadcrumb-item>
        <el-breadcrumb-item>策略列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-table :data="tableData" style="width: 100%" @expand-change="expandRow">
        <el-table-column type="expand">
          <template>
            <el-table :data="subTableData" class="sub-table" border>
              <el-table-column label="算法名称" prop="mix"></el-table-column>
              <el-table-column label="算法参数" prop="args"></el-table-column>
              <el-table-column label="权重" prop="ratio"></el-table-column>
              <el-table-column label="算法类型" prop="recall"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="策略名称" prop="tactics_name"></el-table-column>
        <el-table-column label="创建时间" prop="create_time"></el-table-column>
        <el-table-column label="状态" prop="type"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      subTableData: [],
      args: {
        mix: "weighted_strategy_merge",
        args: { args1: "value1" },
        ratio: [1],
        recall: ["non_personalize"]
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    expandRow(row) {
      console.log("row", row);
    }
    // SpanMethod() {}
  },
  mounted() {
    this.$http
      .get(
        "https://result.eolinker.com/XPSWZS5f34ebaef584347408754ae22a11de7565a5c5cfd?uri=get_all_tactic"
      )
      .then(res => {
        this.tableData = res.data.data;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
