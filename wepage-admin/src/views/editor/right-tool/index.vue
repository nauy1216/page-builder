<script lang="tsx">
import LayoutOperate from "../components/layout-operate.vue";
import PropOperate from "../components/prop-operate.vue";
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore } from "wepage-admin/store/modules";

@Component({
  components: {
    LayoutOperate,
    PropOperate
  }
})
export default class RightTool extends BaseVue {
  activeName = "1";
  width = 250;

  handleResize(left, top, width) {
    this.width = width;
  }

  get activeCompProps() {
    return PageStore.activeComp && this.$components[PageStore.activeComp.name];
  }

  render() {
    return (
      <div class="right-tool" style={{ width: this.width + "px" }}>
        <vue-draggable-resizable
          x={0}
          y={0}
          w={this.width}
          maxWidth={500}
          minWidth={250}
          draggable={false}
          handles={["ml"]}
          active={true}
          prevent-deactivation={true}
          class="right-tool-vdr"
          onResizing={this.handleResize}
        >
          <el-tabs vModel={this.activeName}>
            <el-tab-pane label="布局" name="1">
              <LayoutOperate></LayoutOperate>
            </el-tab-pane>
            <el-tab-pane label="属性" name="2">
              {this.activeCompProps && <PropOperate></PropOperate>}
            </el-tab-pane>
            <el-tab-pane label="数据" name="3"></el-tab-pane>
            <el-tab-pane label="交互" name="4"></el-tab-pane>
          </el-tabs>
        </vue-draggable-resizable>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
.right-tool-vdr {
  box-sizing: border-box;
  padding: 20px;
  height: 100% !important;
  &::before {
    display: none;
  }
  transform: translate(0, 0) !important;
}
/deep/.handle-ml {
  width: 4px !important;
  height: 40px !important;
  background: rgb(64, 158, 255) !important;
}
</style>
