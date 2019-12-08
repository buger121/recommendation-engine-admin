<template>
  <div>
    <v-header />
    <v-sidebar @collapse-content="collapseContent" @expand-content="expandContent"></v-sidebar>
    <div class="content-box" :class="{'content-collapse': collapse}">
      <div class="content">
        <transition name="el-fade-in-linear">
          <keep-alive>
            <router-view class="page"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
import Sidebar from "@/components/common/Sidebar.vue";

export default {
  data: function() {
    return {
      collapse: false
    };
  },
  components: {
    "v-header": Header,
    "v-sidebar": Sidebar
  },
  methods: {
    collapseContent() {
      this.collapse = true;
    },
    expandContent() {
      this.collapse = false;
    }
  }
};
</script>

<style scoped>
.content-box {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: var(--header-height);
  left: var(--aside-width);
  background-color: #f0f0f0;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
}
.content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.content-collapse {
  left: var(--aside-expanded-width);
}
.page {
  /* 防止抖动 */
  position: absolute;
  top: 0;
  bottom: 0;
  width: 99%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>