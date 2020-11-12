<script lang="tsx">
import { getDialog } from "wepage-admin/components/dialog/index";
import { uuid } from "shared/utils";
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { AppStore, PageStore } from "wepage-admin/store/modules";

type TreeNode = {
  id: string;
  label: string;
  data: PageLyout | PageComponentOptions;
  children: TreeNode[];
};
@Component({})
export default class CompTree extends BaseVue {
  formData = {
    name: "",
    type: "app"
  };

  rules = {
    name: [
      { required: true, message: "请输入图层名称", trigger: "blur" },
      { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
    ]
  };

  // 页面图层
  get treeData(): TreeNode[] {
    const treeData: TreeNode[] = [];

    const LayoutMap = {};
    let temp;
    for (const layout of PageStore.layouts) {
      temp = {
        id: layout.id,
        label: layout.name,
        data: layout,
        children: []
      };
      treeData.push(temp);
      LayoutMap[layout.id] = temp;
    }

    for (const child of PageStore.children) {
      // 当组件所在图层是页面图层时
      if (LayoutMap[child.layoutId]) {
        LayoutMap[child.layoutId].children.push({
          id: child.id,
          label: child.alias,
          data: child,
          children: []
        });
      }
    }
    return treeData;
  }

  // 应用图层
  get appTreeData(): TreeNode[] {
    // const;
    return [
      {
        id: "appLayout",
        label: "应用图层",
        data: {
          id: "appLayout",
          key: "appLayout",
          name: "应用图层", // 图层名称
          type: "app",
          zIndex: 0, // 图层层级
          show: true, // 是否显示
          mode: "position" // 图层模式
        },
        children: AppStore.appComponents.map(child => {
          return { id: child.id, label: child.alias, data: child, children: [] };
        })
      }
    ];
  }

  isActive(node, data) {
    if (node.level === 1) {
      return PageStore.activeLayout && data.id == PageStore.activeLayout.id;
    } else {
      return PageStore.activeComp && data.id == PageStore.activeComp.id;
    }
  }

  isDeactive(node, data) {
    if (node.level === 1) {
      return !PageStore.activeLayout || data.id !== PageStore.activeLayout.id;
    } else {
      return !PageStore.activeComp || data.id !== PageStore.activeComp.id;
    }
  }

  remove(data: TreeNode, node) {
    if (node.level === 1) {
      PageStore.removeLayout(data.id);
    } else {
      PageStore.removeComponent(data.id);
    }
  }

  active(data: TreeNode, node) {
    if (node.level === 1) {
      PageStore.setActiveLayout(data.data as any);
    } else {
      PageStore.setActiveComp(data.id);
    }
  }

  deactive(node) {
    if (node.level === 1) {
      PageStore.setActiveLayout(null);
    } else {
      PageStore.setActiveComp(null);
    }
  }

  showAddDialog() {
    getDialog().show({
      dialogProps: {
        title: "新增图层"
      },
      renderContent: () => (
        <div>
          <el-form ref="form" {...{ props: { model: this.formData } }} rules={this.rules} label-width="80px">
            <el-form-item label="名称" prop="name">
              <el-input vModel={this.formData.name}></el-input>
            </el-form-item>
            {/*             <el-form-item label="图层类型" prop="name">
              <el-select v-model={this.formData.type} placeholder="请选择">
                <el-option label="应用图层" value="app"></el-option>
                <el-option label="页面图层" value="page"></el-option>
              </el-select>
            </el-form-item>*/}
          </el-form>
        </div>
      ),
      confirm: close => {
        (this.$refs.form as any).validate(valid => {
          if (valid) {
            PageStore.addLayout({
              id: uuid(),
              name: this.formData.name,
              type: this.formData.type as any,
              zIndex: 0,
              show: true,
              mode: "position"
            });
            close();
          }
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div style="margin-bottom: 10px;">
          <el-button onClick={this.showAddDialog}>新增图层</el-button>
        </div>
        <div class="title">应用图层</div>
        <el-tree data={this.appTreeData} node-key="id" expand-on-click-node={false}>
          {({ node, data }) => {
            return (
              <div style="flex: 1 1 100%; display: flex; justify-content: space-between; align-items: center;">
                <span>{node.label}</span>
                <span style="float: right;">
                  {this.isDeactive(node, data) && (
                    <el-button type="text" size="mini" onClick={() => this.active(data, node)}>
                      激活
                    </el-button>
                  )}
                  {this.isActive(node, data) && (
                    <el-button type="text" size="mini" onClick={() => this.deactive(node)}>
                      取消激活
                    </el-button>
                  )}
                  {node.level === 1 && (
                    <el-button type="text" size="mini" onClick={() => (data.data.show = !data.data.show)}>
                      {data.data.show ? "隐藏" : "显示"}
                    </el-button>
                  )}
                </span>
              </div>
            );
          }}
        </el-tree>
        <div class="title">页面图层</div>
        <el-tree data={this.treeData} node-key="id" expand-on-click-node={false}>
          {({ node, data }) => {
            return (
              <div style="flex: 1 1 100%; display: flex; justify-content: space-between; align-items: center;">
                <span>{node.label}</span>
                <span style="float: right;">
                  {this.isDeactive(node, data) && (
                    <el-button type="text" size="mini" onClick={() => this.active(data, node)}>
                      激活
                    </el-button>
                  )}
                  {this.isActive(node, data) && (
                    <el-button type="text" size="mini" onClick={() => this.deactive(node)}>
                      取消激活
                    </el-button>
                  )}
                  {node.level === 1 && (
                    <el-button type="text" size="mini" onClick={() => (data.data.show = !data.data.show)}>
                      {data.data.show ? "隐藏" : "显示"}
                    </el-button>
                  )}
                  <el-button type="text" size="mini" onClick={() => this.remove(data, node)}>
                    删除
                  </el-button>
                </span>
              </div>
            );
          }}
        </el-tree>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 10px 0;
  color: var(--font-color-gray1);
}
</style>
