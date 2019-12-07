<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-data-analysis icon"></i>首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>算法管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="table">
        <el-table :data="data" border width="80%">
          <el-table-column label="算法名称" width="220" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.func }}</span>
            </template>
          </el-table-column>
          <el-table-column label="方法名" width="190" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="算法说明" width="260" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.note }}</span>
            </template>
          </el-table-column>
          <el-table-column label="算法类型" width="190" align="center">
            <template slot-scope="scope">
              <el-tag :type="tagType(scope.row.type)">
                <span>{{ scope.row.type }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="算法参数" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="showArgs(scope.$index, scope.row)"
              >参数说明</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination background layout="total, prev, pager, next" :total="this.data.length"></el-pagination>
        </div>

        <el-dialog title="参数详情" :visible.sync="argsVisible">
          <el-table :data="args" border>
            <el-table-column property="args_key" label="参数名称" width="150"></el-table-column>
            <el-table-column property="args_type" label="参数类型" width="150"></el-table-column>
            <el-table-column property="args_note" label="参数说明"></el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      data: [],
      args: [],
      argsVisible: false
    };
  },
  methods: {
    showArgs(index, row) {
      this.args = [];
      for (let i = 0; i < row.args_key.length; i++) {
        this.args[i] = {
          args_key: row.args_key[i],
          args_note: row.args_note[i],
          args_type: "String"
        };
      }
      this.argsVisible = true;
    },
    tagType(type) {
      switch (type) {
        case "近线计算":
          return "success";
        case "召回算法":
          return "null";
        case "排序算法":
          return "warning";
        case "融合算法":
          return "danger";
      }
    }
  },
  computed: {
    // alg_data() {
    //   let alg_data = this.data.map(obj => {
    //     let { note, type, func, name } = obj;
    //     return { note, type, func, name };
    //   });
    //   return alg_data;
    // }
  },
  mounted() {
    this.$http
      .get(
        "https://result.eolinker.com/XPSWZS5f34ebaef584347408754ae22a11de7565a5c5cfd?uri=get_all_alg"
      )
      .then(res => {
        this.data = res.data.data;
        // console.log('data', this.data);
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
.container {
  padding: 30px 70px;
}
.pagination {
  margin-top: 20px;
}
</style>
