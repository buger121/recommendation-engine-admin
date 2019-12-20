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
      <el-table :data="tableData" style="width: 100%" @expand-change="expandRow" border>
        <el-table-column type="expand" label="...">
          <template>
            <el-table :data="subTableData" class="sub-table" border>
              <el-table-column label="算法名称" prop="name" align="center"></el-table-column>
              <el-table-column label="算法参数" prop="args" align="center">
                <template slot-scope="scope" class="argContainer">
                  <div v-for="(value, name) in args[scope.$index]" :key="name" class="arg">
                    <span class="key">{{name}}</span>
                    <span>-</span>
                    <span class="value">{{value}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="权重" prop="weight" align="center"></el-table-column>
              <el-table-column label="算法类型" prop="type" align="center"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="策略名称" prop="tactics_name" align="center" width="120"></el-table-column>
        <el-table-column label="说明" prop="note" align="center"></el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="type" align="center" width="120">
          <template slot-scope="scope">
            <el-tag :type="tagType(scope.row.type)">
              <span>{{ scope.row.type === 'true' ? '可用' : '不可用' }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
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
      data: {},
      tableData: [],
      subTableData: [],
      args: []
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    getArgs(name) {
      const func = this.data.function;
      const item = func.find(item => item.func === name);
      return item.args;
    },
    expandRow(row) {
      //重置数据
      this.args = [];
      this.subTableData = [];
      //mix, rank算法类型处理
      const algTypes = ["mix", "rank"];
      for (let i = 0; i < 2; i++) {
        const name = row[algTypes[i]];
        const args = this.getArgs(name);
        this.args.push(args);
        let alg = {
          name,
          weight: 1,
          type: algTypes[i]
        };
        this.subTableData.push(alg);
      }
      //recall类型单独处理
      for (let i = 0; i < row.ratio_list.length; i++) {
        const name = row.recall[i];
        const args = this.getArgs(name);
        this.args.push(args);
        let alg = {
          name,
          weight: row.ratio_list[i],
          type: "recall"
        };
        this.subTableData.push(alg);
      }
    },
    tagType(type) {
      switch (type) {
        case "true":
          return "success";
        case "false":
          return "danger";
      }
    }
  },
  mounted() {
    this.$http
      .get(
        "https://result.eolinker.com/XPSWZS5f34ebaef584347408754ae22a11de7565a5c5cfd?uri=get_all_tactic"
      )
      .then(res => {
        let data = res.data.data.tactics;
        data = data.map(item => {
          item.create_time = this.TimeFormat(item.create_time);
          return item;
        });
        this.tableData = data;
        this.data = res.data.data;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
.arg {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.key {
  padding-left: 20px;
  margin-right: 15px;
  width: 120px;
  text-align: end;
  color: #99a9bfe0;
}
.value {
  padding-left: 15px;
  max-width: 70px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
</style>
