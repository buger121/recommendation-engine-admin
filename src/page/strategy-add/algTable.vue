<template>
  <div>
    <el-table :data="data" border width="80%">
      <el-table-column label="序号" prop="number" width="60" align="center"></el-table-column>
      <el-table-column label="算法名称" prop="name" width="160" align="left"></el-table-column>
      <el-table-column label="算法说明" prop="desc" width="160" align="left"></el-table-column>
      <el-table-column label="算法参数" prop="args" align="left"></el-table-column>
      <el-table-column label="权重" prop="weight" width="160" align="center">
        <template slot-scope="scope">
          <transition name="el-fade-in-linear">
            <el-input
              v-if="showEdit===true && scope.row.type==='recall'"
              placeholder="请输入权重"
              v-model="editWeight"
              size="mini"
            >
              <el-button slot="append" icon="el-icon-check" @click="EditWeight(scope.row)"></el-button>
            </el-input>
            <el-tag type="info" v-else>{{scope.row.weight}}</el-tag>
          </transition>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="260">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.type === 'recall'"
            type="text"
            icon="el-icon-edit"
            @click="handleSetWeight(scope.$index, scope.row)"
          >修改权重</el-button>
          <el-button
            type="text"
            icon="el-icon-edit"
            class="yellow"
            @click="handleConfigArgs(scope.$index, scope.row)"
          >参数配置</el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            class="red"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="参数配置" :visible.sync="argsConfigVisible">
      <el-table :data="argsData" border>
        <el-table-column property="name" label="参数名" width="150"></el-table-column>
        <el-table-column property="type" label="参数类型" width="200"></el-table-column>
        <el-table-column label="参数值">
          <template>
            <el-input></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="argsConfigVisible = false">取 消</el-button>
        <el-button type="primary" @click="argsConfigVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [], //维系表格数据
      count: 1, //算法序号
      funcs: [], //所有算法列表，查找参数
      showEdit: false,
      editWeight: null,
      argsData: [],
      argsConfigVisible: false
    };
  },
  props: ["algList", "type"],
  computed: {
    updateAlg() {
      return this.algList;
    }
  },
  watch: {
    updateAlg: function(val) {
      this.count = 1;
      this.data = [];
      //更新表格
      val.map(item => {
        const newAlg = {
          name: item,
          number: this.count,
          type: this.type,
          desc: this.getDescByName(item),
          args: this.getArgsByName(item).join(", "),
          weight: "1"
        };
        this.count++;
        this.data.push(newAlg);
      });
    }
  },
  methods: {
    handleSetWeight() {
      this.showEdit = true;
    },
    handleConfigArgs(index, row) {
      this.argsData = [];
      const args = this.getArgsByName(row.name);
      args.map(arg => {
        const newArg = {
          name: arg,
          type: "String"
        };
        this.argsData.push(newArg);
      });
      this.argsConfigVisible = true;
    },
    handleDelete(index, row) {
      this.data = this.data.filter(item => item.name !== row.name);
      this.$message({
        type: "success",
        message: "删除成功"
      });
    },
    getArgsByName(name) {
      const alg = this.funcs.find(item => {
        return item.func === name;
      });
      if (!alg) return null;
      return alg.args_key;
    },
    getDescByName(name) {
      const alg = this.funcs.find(item => {
        return item.func === name;
      });
      if (!alg) return null;
      return alg.note;
    },
    EditWeight(row) {
      this.data.forEach(item => {
        if (row.name === item.name) item.weight = this.editWeight;
      });
      this.$message({
        type: "success",
        message: "修改成功"
      });
      this.showEdit = false;
    }
  },
  mounted() {
    this.$http
      .get(
        "https://result.eolinker.com/XPSWZS5f34ebaef584347408754ae22a11de7565a5c5cfd?uri=get_all_alg"
      )
      .then(res => {
        this.funcs = res.data.data;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style>
.el-input-group__append .el-button--default {
  padding: 0 5px !important;
}
.el-table__row .cell .el-tag {
  height: 28px !important;
}
</style>