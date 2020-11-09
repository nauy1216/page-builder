<script lang="tsx">
import BaseVue from "wepage-admin/BaseVue";
import { Component } from "vue-property-decorator";

interface Menu {
  icon: string;
  index: string;
  title: string;
  subs?: Menu[];
}

@Component
export default class Sidebar extends BaseVue {
  collapse = false;
  items: Menu[] = [
    {
      icon: "el-icon-s-tools",
      index: "appManage",
      title: "应用管理",
      subs: []
    }
  ];

  get onRoutes() {
    return this.$route.path.replace("/", "");
  }

  render() {
    return (
      <div class="rp-sidebar">
        <el-menu default-active={this.onRoutes} collapse={this.collapse} unique-opened router>
          {this.items.map(item => {
            if (item.subs && item.subs.length > 0) {
              return (
                <el-submenu index={item.index} key={item.index}>
                  <template slot="title">
                    <i class={item.icon}></i>
                    <span slot="title">{item.title}</span>
                  </template>
                  {item.subs.map(subItem => {
                    return (
                      <el-menu-item index={subItem.index} key={subItem.index}>
                        {subItem.title}
                      </el-menu-item>
                    );
                  })}
                </el-submenu>
              );
            } else {
              return (
                <el-menu-item index={item.index} key={item.index}>
                  <i class={item.icon}></i>
                  <span slot="title">{item.title}</span>
                </el-menu-item>
              );
            }
          })}
        </el-menu>
      </div>
    );
  }
}
</script>

<style scoped lang="scss">
@import "shared/style/bem.scss";
@include b(sidebar) {
  display: block;
  position: absolute;
  left: 0;
  top: var(--header-height);
  width: var(--sidebar-width);
  height: calc(100vh - var(--header-height));
  overflow: auto;
  .el-menu {
    width: 100%;
    border: none !important;
  }
}
</style>
