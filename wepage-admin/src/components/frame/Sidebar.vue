<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" unique-opened router>
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
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
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
  </div>
</template>

<script lang="ts">
import defineComponent from "wepage-admin/types/defineComponent";
export default defineComponent({
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-s-tools",
          index: "appManage",
          title: "应用管理"
        },
        {
          icon: "el-icon-s-tools",
          index: "1",
          title: "数据源管理",
          subs: [
            {
              icon: "el-icon-s-tools",
              index: "2",
              title: "静态数据源"
            },
            {
              icon: "el-icon-s-tools",
              index: "3",
              title: "数据模型"
            }
          ]
        },
        {
          icon: "el-icon-s-tools",
          index: "4",
          title: "应用实例管理"
        }
      ]
    };
  },
  computed: {
    onRoutes(): string {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    this.$eventBus.$on("collapse", msg => {
      this.collapse = msg;
      this.$eventBus.$emit("collapse-content", msg);
    });
  }
});
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
