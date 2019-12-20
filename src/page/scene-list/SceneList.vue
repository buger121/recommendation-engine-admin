<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-data-analysis icon"></i>首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>场景管理</el-breadcrumb-item>
        <el-breadcrumb-item>场景列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="table">
        <el-table :data="tableData" border width="80%">
          <el-table-column label="场景名称" prop="sence" align="center"></el-table-column>
          <el-table-column label="场景编码" prop="_id" align="center" width="120"></el-table-column>
          <el-table-column label="场景说明" prop="note" width="170" align="center"></el-table-column>
          <el-table-column label="应用策略" prop="tactics.tactics_name" width="100" align="center"></el-table-column>
          <el-table-column label="创建时间" width="120" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="creator" align="center" width="100"></el-table-column>
          <el-table-column label="状态" width="100" align="center">
            <template slot-scope="scope">
              <el-tag :type="tagType(scope.row.type)">
                <span>{{ scope.row.type }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="近线计算" width="170" align="center">
            <template slot-scope="scope">
              <el-tag effect="dark" type="info" v-if="scope.row.near_func == null">
                <span>null</span>
              </el-tag>
              <span v-else>{{ scope.row.near_func}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button>
              <el-button
                type="text"
                icon="el-icon-delete"
                class="yellow"
                @click="handleStop(scope.$index, scope.row)"
              >停用</el-button>
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="ctrlOpt">
          <div class="pagination">
            <el-pagination
              background
              layout="total, prev, pager, next"
              :total="this.tableData.length"
            ></el-pagination>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">添加场景</el-button>
          </div>
        </div>

        <el-dialog title="添加场景" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="场景名称" label-width="120px">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="近线计算" label-width="120px">
              <el-select v-model="form.region" placeholder="请选择近线计算">
                <el-option label="register_search_scene" value="register_search_scene"></el-option>
                <el-option label="reading_scence" value="reading_scence"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="场景说明" label-width="120px">
              <el-input v-model="form.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" label-width="120px">
              <el-radio-group v-model="form.type">
                <el-radio :label="true">true</el-radio>
                <el-radio :label="false">false</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="创建人" label-width="120px">
              <el-input v-model="form.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="应用策略" label-width="120px">
              <el-select v-model="form.region" placeholder="请选择应用策略">
                <el-option label="A" value="A"></el-option>
                <el-option label="B" value="B"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {}
    };
  },
  methods: {
    tagType(type) {
      switch (type) {
        case "true":
          return "success";
        case "false":
          return "danger";
      }
    },
    handleDelete() {},
    handleEdit() {},
    handleStop(index) {
      try {
        if (this.tableData[index].type !== "true") return;
        this.tableData[index].type = "false";
        this.$message({
          message: "停用成功",
          type: "success"
        });
      } catch {
        this.$message.error("停用错误");
      }
    },
    handleAdd() {
      // this.$router.push("/scene-add");
      this.dialogFormVisible = true;
    }
  },
  mounted() {
    this.$http
      .get(
        "https://result.eolinker.com/XPSWZS5f34ebaef584347408754ae22a11de7565a5c5cfd?uri=get_all_scene"
      )
      .then(res => {
        let data = res.data.data.scene;
        data = data.map(item => {
          item.create_time = this.TimeFormat(item.create_time);
          return item;
        });
        this.tableData = data;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
.ctrlOpt {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>