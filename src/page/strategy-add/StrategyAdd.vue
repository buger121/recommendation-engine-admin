<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-data-analysis icon"></i>首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>策略管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加策略</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card shadow="hover" class="algCard" v-for="item in algList" :key="item.label">
      <div slot="header" class="clearfix">
        <span>{{item.name}}</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-checkbox-group v-model="updateList[item.type]">
            <el-checkbox :label="label" v-for="label in item.labels" :key="label"></el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="19">
          <alg-table :algList="getAlgList(item.type)" :type="item.type"></alg-table>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="container">
      <el-form ref="form" :model="form" label-width="80px" style="width:80%">
        <el-form-item label="策略名称">
          <el-input v-model="form.name" suffix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <div class="algList">
          <span class="label">添加的算法</span>
          <el-table :data="addedList" style="width:80%;" :show-header="false">
            <el-table-column>
              <template slot-scope="scope">
                <div>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  class="red"
                  @click="handleDelete(scope.$index, scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button style="margin-left: 35px;">取消</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import AlgTable from "./algTable";

export default {
  data: function() {
    return {
      form: {},
      updateList: {
        recall: [],
        mix: [],
        rank: []
      },
      algList: [
        {
          name: "召回算法",
          type: "recall",
          labels: ["item_based_cf", "non_personalize"]
        },
        {
          name: "融合算法",
          type: "mix",
          labels: ["weighted_strategy_merge"]
        },
        {
          name: "排序算法",
          type: "rank",
          labels: ["normal_based_sorted"]
        }
      ]
    };
  },
  components: {
    AlgTable
  },
  methods: {
    onSubmit() {},
    getAlgList(type) {
      switch (type) {
        case "recall":
          return this.updateList.recall;
        case "mix":
          return this.updateList.mix;
        case "rank":
          return this.updateList.rank;
        default:
          break;
      }
    },
    handleDelete(index, row) {
      this.updateList.recall = this.updateList.recall.filter(
        item => item !== row.title
      );
      this.updateList.mix = this.updateList.mix.filter(
        item => item !== row.title
      );
      this.updateList.rank = this.updateList.rank.filter(
        item => item !== row.title
      );
    }
  },
  computed: {
    addedList() {
      const list = [];
      this.updateList.recall.map(item => list.push({ title: item }));
      this.updateList.mix.map(item => list.push({ title: item }));
      this.updateList.rank.map(item => list.push({ title: item }));
      return list;
    }
  }
};
</script>

<style>
.algCard {
  margin: 22px 0 22px 10px;
}
.algCard .el-checkbox-group .el-checkbox {
  display: block;
  margin-bottom: 10px;
  margin-right: 0;
  border-bottom: 1px solid #ebeef5;
  line-height: 30px;
}
.algCard .el-checkbox__label {
  margin-left: 20px !important;
}
.algList {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.algList .el-table {
  display: inline-block;
  margin-left: 12px;
}
.algList .el-table .el-table__row {
  border-left: 3px solid #333 !important;
}
.algList .label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
</style>
