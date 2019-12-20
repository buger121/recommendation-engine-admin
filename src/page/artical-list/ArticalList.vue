<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-data-analysis icon"></i>首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="filter">
        <el-form :inline="true" :model="filter" class="filter-container">
          <el-form-item label="文章标题">
            <el-input
              v-model="filter.user"
              placeholder="查找标题"
              suffix-icon="el-icon-edit"
              width="120"
            ></el-input>
          </el-form-item>
          <el-form-item label="关键词">
            <el-select v-model="filter.region" placeholder="选择关键词">
              <el-option label="全部" value="A"></el-option>
              <el-option label="A" value="A"></el-option>
              <el-option label="B" value="B"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="filter.category" placeholder="选择分类">
              <el-option label="全部" value="A"></el-option>
              <el-option label="健康报" value="A"></el-option>
              <el-option label="健康频道" value="B"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="filter.review" placeholder="选择审核状态">
              <el-option label="全部" value="A"></el-option>
              <el-option label="审核通过" value="A"></el-option>
              <el-option label="审核未通过" value="B"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推广状态">
            <el-select v-model="filter.promote" placeholder="选择推广状态">
              <el-option label="全部" value="A"></el-option>
              <el-option label="已推广" value="A"></el-option>
              <el-option label="未推广" value="B"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="btnContainer">
          <el-button type="primary" @click="filterSearch" icon="el-icon-search">查询</el-button>
          <el-button type="primary" @click="filterSearch" plain>重置</el-button>
        </div>
      </div>
      <div>
        <el-table :data="tableData" border>
          <el-table-column label="文章标题" prop="title" align="left" width="120"></el-table-column>
          <el-table-column label="关键词" prop align="center"></el-table-column>
          <el-table-column label="标签" prop="tag" align="center"></el-table-column>
          <el-table-column label="原始url" prop="article_url" align="left" width="200"></el-table-column>
          <el-table-column label="文章来源" prop="source_url" align="left" width="200"></el-table-column>
          <el-table-column label="分类/频道" prop="platform_name" align="left" width="130"></el-table-column>
          <el-table-column label="爬取时间" prop="created_date" align="center" width="120"></el-table-column>
          <el-table-column label="审核人" prop="reviewer" align="center"></el-table-column>
          <el-table-column label="审核时间" prop="review_date" align="center"></el-table-column>
          <el-table-column label="审核状态" prop="review_status" align="center"></el-table-column>
          <el-table-column label="推广人" prop="promoter" align="center"></el-table-column>
          <el-table-column label="推广时间" prop="promote_date" align="center"></el-table-column>
          <el-table-column label="推广状态" prop="promote_status" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="handleToProfile(scope.$index, scope.$row)"
                size="mini"
              >查看画像</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      filter: {}
    };
  },
  methods: {
    handleToProfile() {
      this.$router.push("/artical-profile");
    },
    filterSearch() {
      console.log(this.filter);
    }
  },
  mounted() {
    this.$http
      .get(
        "https://result.eolinker.com/XPSWZS5f34ebaef584347408754ae22a11de7565a5c5cfd?uri=/get_articles"
      )
      .then(res => {
        let data = res.data.article_list;
        data = data.map(item => {
          item.created_date = this.TimeFormat(item.created_date);
          item.date = this.TimeFormat(item.date);
          return item;
        });
        this.tableData = data;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
.filter-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.el-form--inline .el-form-item {
  margin-right: 20px;
}
.btnContainer .el-button {
  padding: 12px 80px;
  margin-bottom: 15px;
}
</style>