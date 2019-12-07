<template>
  <div class="sidebar" @mouseenter="hover" @mouseleave="leave">
    <transition name="expand">
      <el-menu
        :default-active="activeIndex"
        class="menu"
        :class="{hover: isHover}"
        @select="handleSelect"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        :collapse="collapse"
        unique-opened
        router
      >
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                  <template slot="title">{{ subItem.title }}</template>
                  <el-menu-item
                    v-for="(threeItem,i) in subItem.subs"
                    :key="i"
                    :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </transition>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      items: [
        {
          icon: "el-icon-s-home",
          index: "dashboard",
          title: "首页"
        },
        {
          icon: "el-icon-data-line",
          index: "alg",
          title: "算法管理"
        },
        {
          icon: "el-icon-table-lamp",
          index: "strategy",
          title: "策略管理",
          subs: [
            {
              index: "strategy-list",
              title: "策略列表"
            },
            {
              index: "strategy-add",
              title: "添加策略"
            }
          ]
        },
        {
          icon: "el-icon-price-tag",
          index: "scene",
          title: "场景管理",
          subs: [
            {
              index: "scene-list",
              title: "场景列表"
            },
            {
              index: "scene-add",
              title: "添加场景"
            }
          ]
        },
        {
          icon: "el-icon-notebook-2",
          index: "rec",
          title: "推荐分析",
          subs: [
            {
              index: "rec-list",
              title: "推荐记录"
            },
            {
              index: "rec-analysis",
              title: "推荐策略效果分析"
            },
            {
              index: "search-analysis",
              title: "搜索关键词分析"
            }
          ]
        },
        {
          icon: "el-icon-key",
          index: "profile",
          title: "画像查看",
          subs: [
            {
              title: "文章管理",
              index: "article",
              subs: [
                {
                  index: "artical-list",
                  title: "文章列表"
                },
                {
                  index: "artical-profile",
                  title: "文章画像"
                },
                {
                  index: "artical-add",
                  title: "添加文章"
                }
              ]
            },
            {
              icon: "el-icon-home",
              index: "user",
              title: "用户管理",
              subs: [
                {
                  index: "user-list",
                  title: "用户列表"
                },
                {
                  index: "user-profile",
                  title: "用户画像"
                }
              ]
            }
          ]
        }
      ],
      activeIndex: "dashboard",
      collapse: true,
      isHover: false
    };
  },
  methods: {
    handleSelect() {},
    hover() {
      this.collapse = false;
      this.isHover = true;
      this.$emit("collapse-content");
    },
    leave() {
      this.collapse = true;
      this.isHover = false;
      this.$emit("expand-content");
    }
  },
  computed: {}
};
</script>

<style scoped>
.sidebar {
  height: calc(100vh - 65px);
  display: block;
  position: absolute;
  z-index: 99;
  left: 0;
  top: 65px;
  bottom: 0;
  overflow-y: scroll;
  background: var(--primary);
}
.menu {
  transition: all 1s ease-in;
}
.sidebar .hover {
  /* -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in; */

  width: 170px;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar > ul {
  height: 100%;
}
</style>